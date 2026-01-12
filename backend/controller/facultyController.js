// controller/facultyController.js

const Faculty = require("../models/faculty");

exports.facultyLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1️⃣ Validate input
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Normalize role (frontend vs DB)
   const roleMap = {
      Counsellor: "Counsellor",
      "Year Coordinator": "Year Coordinator",
      "Head of the Department": "Head of the Department",
      "Office Assistant": "Office Assistant",
    };

    const dbRole = roleMap[role];
    if (!dbRole) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // 3️⃣ Find faculty in DB
    const faculty = await Faculty.findOne({
      where: {
        mail: email,
        role: dbRole,
      },
    });

    if (!faculty) {
      return res.status(404).json({ message: "No faculty found" });
    }

    // 4️⃣ Check password (plain text for now)
    if (faculty.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 5️⃣ Success
    return res.status(200).json({
      message: "Login successful",
      faculty: {
        id: faculty.f_id,
        name: faculty.faculty_name,
        role: faculty.role,
        branch: faculty.faculty_branch,
        mail: faculty.mail,
      },
    });
  } catch (error) {
    console.error("❌ Faculty login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getFacultyByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const faculty = await Faculty.findOne({
      where: { mail: email },
    });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    return res.json({
      f_id: faculty.f_id,
      role: faculty.role,
      faculty_name: faculty.faculty_name,
      branch: faculty.faculty_branch,
    });
  } catch (err) {
    console.error("getFacultyByEmail error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getFacultyByBranchAndRole = async (req, res) => {
  try {
    const { branch, role } = req.params;

    // Map frontend role to DB role
    const roleMap = {
      counsellor: "Counsellor",
      year_coordinator: "Year Coordinator",
      hod: "Head of the Department",
    };

    const dbRole = roleMap[role]; // maps 'year_coordinator' -> 'Year Coordinator'

    if (!dbRole) return res.status(400).json({ message: "Invalid role" });

    const faculty = await Faculty.findAll({
      where: {
        faculty_branch: branch,
        role: dbRole,
      },
      attributes: ["f_id", "faculty_name", "mail"],
    });

    res.status(200).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

