// controllers/daysoutpassController.js
const DayScholarOutpass = require("../models/dayscholar_outpass");
const Student = require("../models/student");

/** ✅ Fetch student by regNo */
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

/** ✅ Create Day Scholar Outpass */
const createDayScholarOutpass = async (req, res) => {
  try {
    const { regNo, reason, fromDate, toDate, leavingTime } = req.body;

    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const newOutpass = await DayScholarOutpass.create({
      studentId: student.studentId,
      studentName: student.studentName,
      regNo: student.regNo,
      year: student.year,
      branch: student.branch,
      section: student.section,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      counsellor: student.counsellor,
      reason,
      fromDate,
      toDate,
      leavingTime,
      dateOfApplication: new Date(),
    });

    res.status(201).json({ message: "✅ Day Scholar Outpass Created", newOutpass });
  } catch (err) {
    console.error("❌ Error creating Day Scholar Outpass:", err);
    res.status(500).json({ error: "Failed to create outpass" });
  }
};

module.exports = { getStudentByRegNo, createDayScholarOutpass };
