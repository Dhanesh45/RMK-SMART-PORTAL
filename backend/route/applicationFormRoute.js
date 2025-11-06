const express = require("express");
const router = express.Router();
const ApplicationForm = require("../models/application_form");
const Student = require("../models/student");

// ✅ Create new application form
router.post("/", async (req, res) => {
  try {
    console.log("🧾 Received body:", req.body);
    const { studentId, reason, fatherName,section, houseNo, dob, age, street, area, city, state, pincode, category, boardingPlace, bonafideType } = req.body;

    if (!studentId) {
      return res.status(400).json({ error: "Missing studentId" });
    }

    // ✅ Find the student first
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // ✅ Create the application form
    const form = await ApplicationForm.create({
      student_id:studentId,
      reason,
      fatherName,
      houseNo,
      dob,
      age,
      street,
      area,
      city,
      state,
      pincode,
      category,
      boardingPlace,
      bonafideType,
    });

    console.log("✅ Application Form saved:", form.toJSON());
    res.status(201).json({ message: "Form submitted successfully!", data: form });
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    res.status(500).json({ error: "Server error while submitting form." });
  }
});

module.exports = router;
