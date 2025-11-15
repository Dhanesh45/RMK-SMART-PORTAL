const ApplicationForm = require("../models/application_form");
const Student = require("../models/student");

/** ✅ Get Student details using RegNo */
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

/** ✅ Create Bonafide Application */
const createBonafide = async (req, res) => {
  try {
    const {
      regNo,
      semester,
      age,
      fatherName,
      date_of_birth,
      boarding,
      houseno,
      street,
      area,
      city,
      state,
      pincode,
      reason,
      category,
      fees_detail_year,
      type_of_application,
    } = req.body;

    // Find student by Reg No
    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Create Bonafide record
    const newApplication = await ApplicationForm.create({
      sid: student.studentId,
      semester,
      age,
      fatherName,
      date_of_birth,
      boarding,
      houseno,
      street,
      area,
      city,
      state,
      pincode,
      reason,
      category,
      fees_detail_year,
      type_of_application,
      applied_date: new Date(),
      hstatus: 0,
      osstatus: 0,
    });

    res.status(201).json({ message: "✅ Bonafide Application Submitted", newApplication });
  } catch (err) {
    console.error("❌ Error creating Bonafide:", err);
    res.status(500).json({ error: "Failed to submit application" });
  }
};

module.exports = { getStudentByRegNo, createBonafide };
