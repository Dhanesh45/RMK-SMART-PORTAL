const DayscholarOD = require("../models/dayscholor_od");
const Student = require("../models/student");

/**
 * ✅ Get student details by register number
 */
const getStudentForDayscholarOD = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({ where: { regNo } });

    if (!student)
      return res.status(404).json({ message: "Student not found" });

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
      date
    } = req.body;

    const student = await Student.findOne({ where: { regNo } });

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    await DayscholarOD.create({
      student_id: student.studentId,
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

module.exports = {
  getStudentForDayscholarOD,
  createDayscholarOD,
};
