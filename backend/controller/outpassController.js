// controller/outpassController.js
const Outpass = require("../models/outpass");
const Student = require("../models/student");

/** ✅ GET student details using regNo */
const getStudentByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({ where: { regNo } });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    console.error("❌ Error fetching student:", err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

/** ✅ Create Outpass */
const createOutpass = async (req, res) => {
  try {
    const {
      regNo,
      roomNumber,
      noOfDays,
      fromDate,
      toDate,
      reasonForLeave,
      parentsPermission,
      forOd,
      leavingDate,
      leavingTime,
    } = req.body;

    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const newOutpass = await Outpass.create({
      studentId: student.studentId,
      studentName: student.studentName,
      regNo: student.regNo,
      year: student.year,
      branch: student.branch,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      roomNumber,
      noOfDays,
      fromDate,
      toDate,
      reasonForLeave,
      parentsPermission,
      forOd,
      leavingDate,
      leavingTime,
      dateOfApplication: new Date(),
      cstatus: 0,
      ystatus: 0,
      hstatus: 0,
    });

    res.status(201).json({ message: "✅ Outpass created", newOutpass });
  } catch (err) {
    console.error("❌ Error creating outpass:", err);
    res.status(500).json({ error: "Failed to create outpass" });
  }
};

module.exports = { getStudentByRegNo, createOutpass };
