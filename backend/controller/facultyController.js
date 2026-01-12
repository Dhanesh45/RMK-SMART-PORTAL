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
      Counsellor: "counsellor",
      "Year Coordinator": "year_coordinator",
      "Head of the Department": "hod",
      "Office Assistant": "office_assistant",
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

exports.getCounsellorsByBranch = async (req, res) => {
  try {
    const { branch } = req.params;

    const counsellors = await Faculty.findAll({
      where: {
        faculty_branch: branch,
        role: "Counsellor",
      },
      attributes: ["f_id", "faculty_name", "mail"],
    });

    res.json(counsellors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching counsellors" });
  }
};