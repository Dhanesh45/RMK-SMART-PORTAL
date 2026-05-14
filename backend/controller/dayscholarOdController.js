const DayscholarOD = require("../models/dayscholor_od");
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const { Op } = require("sequelize");

// ✅ Get student details by register number
const getStudentForDayscholarOD = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({ where: { regNo } });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const odAvailed = await DayscholarOD.count({
      where: {
        student_id: student.studentId,
        cstatus: { [Op.gte]: 0 },
      },
    });

    res.status(200).json({
      ...student.toJSON(),
      odAvailed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

// ✅ Create Dayscholar OD
const createDayscholarOD = async (req, res) => {
  try {
    const {
      regNo,
      purpose,
      numberOfDays,
      fromDate,
      toDate,
      place,
      collegeName,
      eventName,
      date,
    } = req.body;

    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // ✅ Count only APPROVED ODs (cstatus=1), not pending
    const odAvailed = await DayscholarOD.count({
      where: {
        student_id: student.studentId,
        cstatus: 1,  // ✅ only approved ones count as "availed"
      },
    });

    let facultyId = null;
    const counsellorValue = student.counsellor;

    if (counsellorValue) {
      const trimmed = String(counsellorValue).trim();
      if (/^\d+$/.test(trimmed)) {
        facultyId = parseInt(trimmed, 10);
      } else {
        const faculty = await Faculty.findOne({
          where: {
            [Op.or]: [{ faculty_name: trimmed }, { mail: trimmed }],
          },
        });
        if (faculty) facultyId = faculty.f_id;
      }
    }

    await DayscholarOD.create({
      student_id: student.studentId,
      facultyId,
      studentName: student.studentName,
      regNo: student.regNo,
      purpose,
      numberOfDays,
      fromDate,
      toDate,
      place,
      collegeName,
      eventName,
      date,
      counsellorComments: null,
      cstatus: 0,
      ystatus: 0,
      hstatus: 0,
      odAvailed: odAvailed + 1,  // ✅ approved count + this new one
    });

    res.status(201).json({ message: "✅ Dayscholar OD submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit OD" });
  }
};

// ✅ Counsellor view pending ODs
const getdayscholarODForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const ODdayscholar = await DayscholarOD.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 0,
      },
      order: [["date", "DESC"]],
    });

    return res.json({ ODdayscholar });
  } catch (err) {
    console.error("getdayscholarODForCounsellor error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get single Dayscholar OD by od_id
const getDayscholarODById = async (req, res) => {
  try {
    const { od_id } = req.params;

    const od = await DayscholarOD.findOne({ where: { od_id } });

    if (!od) {
      return res.status(404).json({ message: "OD not found" });
    }

    const odJson = od.toJSON();

    // ✅ Always count dynamically — count only approved ODs
    const odAvailed = await DayscholarOD.count({
      where: {
        student_id: odJson.student_id,
        cstatus: 1,  // ✅ only approved ones
      },
    });

    const student = await Student.findOne({
      where: { studentId: odJson.student_id },
    });

    // ✅ Explicitly remove stale DB odAvailed before spreading
    const { odAvailed: _stale, ...cleanOdJson } = odJson;

    return res.status(200).json({
      ...cleanOdJson,
      odAvailed,                               // ✅ fresh dynamic count always wins
      branch: student?.branch || "",
      counsellorComments: odJson.counsellorComments || "",
    });

  } catch (err) {
    console.error("getDayscholarODById error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Counsellor approve/reject + counsellorComments + AUTO FORWARD TO YC
const updateCstatus = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { action, counsellorComments } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const od = await DayscholarOD.findOne({ where: { od_id } });
    if (!od) return res.status(404).json({ message: "OD not found" });

    od.cstatus = action === "approve" ? 1 : -1;

    // ✅ Always save counsellorComments regardless — even if empty string
    od.counsellorComments = counsellorComments || null;

    if (action === "approve") {
      const student = await Student.findByPk(od.student_id);

      if (student && student.yearCoordinator) {
        od.facultyId = Number(student.yearCoordinator);
        od.ystatus = 0;
      } else {
        console.warn(`Student ${od.student_id} has no year coordinator`);
      }
    }

    await od.save();

    return res.json({ message: `Dayscholar OD ${action}d successfully`, od });
  } catch (err) {
    console.error("updateCstatus error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
// ✅ Year Coordinator view ODs
const getDayscholarODForYearCoordinator = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const ods = await DayscholarOD.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 1,
        ystatus: 0,
      },
      order: [["date", "DESC"]],
    });

    res.json({ ods });
  } catch (err) {
    console.error("getDayscholarODForYearCoordinator error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Year Coordinator approve/reject
const updateYstatusDayscholarOD = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { action } = req.body;

    const status = action === "approve" ? 1 : -1;

    const result = await DayscholarOD.update(
      { ystatus: status },
      { where: { od_id } }
    );

    console.log("UPDATE RESULT:", result);

    res.json({ message: `Dayscholar OD ${action}d`, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getdayscholarODForCounsellor,
  getDayscholarODById,
  updateCstatus,
  getDayscholarODForYearCoordinator,
  updateYstatusDayscholarOD,
};