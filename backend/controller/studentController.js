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

   // 🔹 Map counsellor email → f_id
const counsellorFaculty = await Faculty.findOne({
  where: { mail: counsellor, role: "Counsellor" }, // DB value
});
if (!counsellorFaculty) {
  return res.status(400).json({ message: "Selected counsellor not found" });
}

// 🔹 Map year coordinator email → f_id
const yearCoordinatorFaculty = await Faculty.findOne({
  where: { mail: year_coordinator, role: "Year Coordinator" }, // DB value
});
if (!yearCoordinatorFaculty) {
  return res.status(400).json({ message: "Selected year coordinator not found" });
}

// 🔹 Map HOD email → f_id
const hodFaculty = await Faculty.findOne({
  where: { mail: hod, role: "Head of the Department" }, // DB value
});
if (!hodFaculty) {
  return res.status(400).json({ message: "Selected HOD not found" });
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

  counsellor: counsellorFaculty.f_id,
  yearCoordinator: yearCoordinatorFaculty.f_id,
  hod: hodFaculty.f_id,

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

// ✅ Get students by counsellor
exports.getStudentsByCounsellor = async (req, res) => {
  try {
    const { f_id } = req.params;

    const students = await Student.findAll({
      where: { counsellor: f_id },
      attributes: [
  "studentId",
  "studentName",
  "regNo",
  "studentMail",
  "year",
  "branch",
  "section",

  "gender",
  "accommodation",
  "parentName",
  "parentPhone",
  "native",

  "counsellor",
  "yearCoordinator",
  "hod"
],
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("❌ Error fetching counsellor students:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.destroy({
      where: { studentId: id },
    });

    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.update(
  {
    studentName: req.body.name,
    regNo: req.body.regNo,
    studentMail: req.body.email,
    year: req.body.year,
    branch: req.body.branch,
    section: req.body.section,

    gender: req.body.gender,
    accommodation: req.body.accommodation,
    parentName: req.body.parentName,
    parentPhone: req.body.parentPhone,
    native: req.body.native,

    counsellor: req.body.counsellor,         // ✅ f_id
    yearCoordinator: req.body.yearCoordinator,
    hod: req.body.hod,
  },
  { where: { studentId: id } }
);

    res.status(200).json({ message: "Student updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};


exports.getStudentsByYearCoordinator = async (req, res) => {
  try {
    const { f_id } = req.params;

    const students = await Student.findAll({
      where: { yearCoordinator: f_id },
      attributes: [
        "studentId",
        "studentName",
        "regNo",
        "studentMail",
        "year",
        "branch",
        "section",
        "gender",
        "accommodation",
        "parentName",
        "parentPhone",
        "native",
        "counsellor",
        "yearCoordinator",
        "hod",
      ],
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("❌ Error fetching year coordinator students:", error);
    res.status(500).json({ message: "Server error" });
  }
};
