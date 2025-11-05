// controller/applicationFormController.js
const ApplicationForm = require("../models/application_form");
const Student = require("../models/student");

// ✅ Create new Application Form with auto-fill from Student table
exports.createApplicationForm = async (req, res) => {
  try {
    const { student_id, ...formFields } = req.body;

    if (!student_id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // 🔍 Fetch student details using student_id
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🧩 Merge student info + form fields
    const applicationData = {
      student_id: student.student_id,
      student_name: student.student_name,
      reg_no: student.reg_no,
      branch: student.branch,
      year: student.year,
      section: student.section,
      accommodation: student.accommodation,
      gender: student.gender,
      parent_name: student.parent_name,
      parent_phone: student.parent_phone,
      ...formFields, // remaining fields from the frontend
    };

    // 🧾 Create new record
    const newApplication = await ApplicationForm.create(applicationData);

    res.status(201).json({
      message: "✅ Application Form created successfully",
      data: newApplication,
    });
  } catch (error) {
    console.error("❌ Error creating application form:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Get all applications (optional)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationForm.findAll({
      include: [{ model: Student, attributes: ["student_name", "reg_no", "branch"] }],
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
