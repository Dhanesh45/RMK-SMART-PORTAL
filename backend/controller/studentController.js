// controller/studentController.js
const { Student, Faculty } = require('../models'); // import from index.js


// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    
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

    // 🔹 Map counsellor email to f_id
const faculty = await Faculty.findOne({ where: { mail: counsellor } });
if (!faculty) {
  return res.status(400).json({ message: "Selected counsellor not found" });
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
      counsellor:faculty.f_id,
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

//Dhanesh Work 

// controller/studentController.js

// ... (existing code for Student require and other exports) ...

// Login an existing student
exports.loginStudent = async (req, res) => {
  try {
    const { student_mail, password } = req.body;

    // Validation
    if (!student_mail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 1. Find the student by email
    const student = await Student.findOne({ 
        where: { studentMail: student_mail },
        // Use 'attributes' to explicitly select the fields you need, including sensitive ones 
        // that must be checked (password) and non-sensitive ones to return.
        attributes: ['studentMail', 'password', 'regNo', 'accommodation'] 
    });

    // Check if student exists
    if (!student) {
      return res.status(404).json({ message: "Student not found or incorrect email" });
    }

    // 2. Verify the password (NOTE: Use bcrypt for production!)
    const isMatch = (password === student.password); // Simple comparison for this example

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials (incorrect password)" });
    }

    // 3. Successful login - RETURN THE REQUIRED DATA
    res.status(200).json({
      message: "Login successful",
      studentData: {
        // Only return the non-sensitive data needed for the dashboard/session
        regNo: student.regNo,
        accommodation: student.accommodation,
      }
    });

  } catch (error) {
    console.error("❌ Error logging in student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};