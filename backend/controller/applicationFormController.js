// backend/controller/applicationFormController.js
const ApplicationForm = require("../models/application_form");
const Student = require("../models/student");

// 🧾 Create new application
exports.createApplicationForm = async (req, res) => {
  try {
    const { student_mail, reason, from_date, to_date, place, contact_number, parent_permission } = req.body;

    // Find student by email
    const student = await Student.findOne({ where: { studentMail: student_mail } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Create new application form
    const application = await ApplicationForm.create({
      student_id: student.studentId,
      student_mail: student.studentMail,
      regNo: student.regNo,
      student_name: student.studentName,
      branch: student.branch,
      year: student.year,
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
};

// 🧾 Fetch all applications with student details
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationForm.findAll({
      include: {
        model: Student,
        attributes: ["studentId", "studentMail", "studentName", "regNo", "branch", "year", "section"],
      },
    });
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch application forms" });
  }
};
