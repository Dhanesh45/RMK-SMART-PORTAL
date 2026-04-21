// controllers/dayscholarODcontroller.js

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
 * ✅ Create Dayscholar OD
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

    /** 🔥 Assign counsellor as initial faculty */
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

/**
 * ✅ Counsellor view pending ODs
 */
const getdayscholarODForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;

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
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Counsellor approve/reject + AUTO FORWARD TO YC
 */
const updateCstatus = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const od = await DayscholarOD.findOne({
  where: { od_id: od_id }
});
    if (!od) return res.status(404).json({ message: "OD not found" });

    // ✅ Update counsellor status
    od.cstatus = action === "approve" ? 1 : -1;

    // 🔥 AUTO FORWARD TO YEAR COORDINATOR
    if (action === "approve") {
      const student = await Student.findByPk(od.student_id);

      if (student && student.yearCoordinator) {
        od.facultyId = Number(student.yearCoordinator); // ✅ move to YC
        od.ystatus = 0; // pending for YC
      } else {
        console.warn(`Student ${od.student_id} has no year coordinator`);
      }
    }

    await od.save();

    return res.json({
      message: `Dayscholar OD ${action}d successfully`,
      od,
    });

  } catch (err) {
    console.error("updateCstatus error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Year Coordinator view ODs
 */
const getDayscholarODForYearCoordinator = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const ods = await DayscholarOD.findAll({
      where: {
        facultyId: Number(facultyId), // ✅ important
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

/**
 * ✅ Year Coordinator approve/reject
 */
// 
const updateYstatusDayscholarOD = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { action } = req.body;
 if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

 const od = await DayscholarOD.findOne({
  where: { od_id: od_id }
});

 if (!od) return res.status(404).json({ message: "OD not found" }); 

    // ✅ Update year coordinator status
    od.ystatus = action === "approve" ? 1 : -1;
// 🔥 AUTO FORWARD TO HOD
    if (action === "approve") {
      const student = await Student.findByPk(od.student_id);

    if (student && student.hod) {
        od.facultyId = Number(student.hod); // ✅ move to hod
        od.hstatus = 0; // pending for hod
      } else {
        console.warn(`Student ${od.student_id} has no hod`);
      }
    }

    await od.save();

    res.json({
      message: `Dayscholar OD ${action}d`,
      od,
    });

  } catch (err) {
    console.error("updateYstatusDayscholarOD error:", err);
    res.status(500).json({ message: "Server error" });
  }
};  


//gokul wrk(down)
const getDayscholarODForHOD = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const ods = await DayscholarOD.findAll({
      where: {
        facultyId: Number(facultyId), // ✅ important
        cstatus: 1,
        ystatus: 1,
        hstatus: 0,
      },
      order: [["date", "DESC"]],
    });

    res.json({ ods });
  } catch (err) {
    console.error("getDayscholarODForYearCoordinator error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateHstatusDayscholarOD = async (req, res) => {
  try {
    const { od_id } = req.params;
    const { action } = req.body;
 if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

 const od = await DayscholarOD.findOne({
  where: { od_id: od_id }
});

 if (!od) return res.status(404).json({ message: "OD not found" }); 

    // ✅ Update HOD status
    od.hstatus = action === "approve" ? 1 : -1;

   
    await od.save();

    res.json({
      message: `Dayscholar OD ${action}d`,
      od,
    });

  } catch (err) {
    console.error("updateYstatusDayscholarOD error:", err);
    res.status(500).json({ message: "Server error" });
  }
};  
module.exports = {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getdayscholarODForCounsellor,
  getDayscholarODForHOD,
  updateCstatus,  
  updateHstatusDayscholarOD,
  getDayscholarODForYearCoordinator,
  updateYstatusDayscholarOD,
};