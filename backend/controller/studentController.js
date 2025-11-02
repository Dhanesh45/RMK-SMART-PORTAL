// controller/studentController.js
const Student = require("../models/student");

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    console.log("🧾 Received body:", req.body);

    const {
      student_mail,
      password,
      regNo,
      year,
      branch,
      student_name,
      gender,
      accommodation,
      parent_name,
      parent_phone,
      native,
      counsellor,
      year_coordinator,
      hod,
      section,
    } = req.body;

    // Validation
    if (!student_mail || !password || !regNo || !student_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email already exists
    const existing = await Student.findOne({ where: { studentMail: student_mail } });
    if (existing) {
      return res.status(400).json({ message: "Student already registered" });
    }

    // Create a new student
    const newStudent = await Student.create({
      studentMail: student_mail,
      password,
      regNo,
      year,
      branch,
      studentName: student_name,
      gender,
      accommodation,
      parentName: parent_name,
      parentPhone: parent_phone,
      native,
      counsellor,
      yearCoordinator: year_coordinator,
      hod,
      section,
    });

    res.status(201).json({
      message: "Student registered successfully",
      data: newStudent,
    });
  } catch (error) {
    console.error("❌ Error registering student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
