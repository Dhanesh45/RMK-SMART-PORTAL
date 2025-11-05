const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const ApplicationForm = require("../models/application_form");

// 🧾 POST: Create application form
router.post("/", async (req, res) => {
  try {
    const { student_mail, reason, from_date, to_date, place, contact_number, parent_permission } = req.body;

    // Step 1: Find the student
    const student = await Student.findOne({ where: { student_mail } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Step 2: Create application form (auto-fill + user fields)
    const application = await ApplicationForm.create({
      student_id: student.student_id,
      student_mail: student.student_mail,
      regNo: student.regNo,
      student_name: student.student_name,
      branch: student.branch,
      year: student.year,
      section: student.section,
      reason,
      from_date,
      to_date,
      place,
      contact_number,
      parent_permission,
    });

    res.status(201).json({
      message: "Application form submitted successfully",
      application,
    });
  } catch (error) {
    console.error("❌ Error creating application form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🧾 GET all applications
router.get("/", async (req, res) => {
  try {
    const applications = await ApplicationForm.findAll({ include: Student });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch application forms" });
  }
});

module.exports = router;
