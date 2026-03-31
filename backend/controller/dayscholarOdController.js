const DayscholarOD = require("../models/dayscholor_od");
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const { Op } = require("sequelize");

/**
 * ✅ Get student details by register number
 */
const getStudentForDayscholarOD = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({ where: { regNo } });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

/**
 * ✅ Create Dayscholar OD (NO OUTPASS)
 */
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
 /** 🔥 NEW: Find counsellor to assign facultyId */
    let facultyId = null;
    const counsellorValue = student.counsellor;

    if (counsellorValue) {
      const trimmed = String(counsellorValue).trim();

      if (/^\d+$/.test(trimmed)) {
        facultyId = parseInt(trimmed, 10); // stored faculty numeric ID
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
      cstatus: 0,
      ystatus: 0,
      hstatus: 0,
    });

    res.status(201).json({ message: "✅ Dayscholar OD submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit OD" });
  }
};
const getdayscholarODForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const ODdayscholar = await DayscholarOD.findAll({
       where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
      order: [["date", "DESC"]],
    });

    return res.json({ ODdayscholar });
  } catch (err) {
    console.error("getdayscholarODForCounsellor error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const updateCstatus = async (req, res) => {
  try {
    const {  od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const ODdayscholars = await DayscholarOD.findByPk(od_id);
    if (!ODdayscholars) return res.status(404).json({ message: "OD not found" });

    ODdayscholars.cstatus = action === "approve" ? 1 : -1;
    await ODdayscholars.save();

    return res.json({ message: `OD ${action}d`, ODdayscholars });
  } catch (err) {
    console.error("updateCstatus error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const forwardDayscholarODToYC = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { yearCoordinatorFacultyId } = req.body;

    if (!yearCoordinatorFacultyId) {
      return res.status(400).json({ message: "YC facultyId required" });
    }

    const od = await DayscholarOD.findByPk(od_id);

    if (!od) return res.status(404).json({ message: "OD not found" });

    if (od.cstatus !== 1) {
      return res.status(400).json({
        message: "OD not approved by counsellor",
      });
    }

    // 🔥 MOVE TO YEAR COORDINATOR
    od.facultyId = Number(yearCoordinatorFacultyId);
    od.ystatus = 0;

    await od.save();

    res.json({ message: "Dayscholar OD forwarded to YC" });
  } catch (err) {
    console.error("forwardDayscholarODToYC error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

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

const updateYstatusDayscholarOD = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const od = await DayscholarOD.findByPk(od_id);

    if (!od) return res.status(404).json({ message: "OD not found" });

    const status = action === "approve" ? 1 : -1;

    od.ystatus = status;
    await od.save();

    res.json({ message: `Dayscholar OD ${action}d by YC` });
  } catch (err) {
    console.error("updateYstatusDayscholarOD error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getDayscholarODForYearCoordinator,
  forwardDayscholarODToYC,
  getdayscholarODForCounsellor,
  updateCstatus,
  updateYstatusDayscholarOD,
};
