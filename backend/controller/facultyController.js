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

    const roleMap = {
      counsellor: "Counsellor",
      year_coordinator: "Year Coordinator",
      hod: "Head of the Department",
    };

    const dbRole = roleMap[role];

    const faculty = await Faculty.findAll({
      where: {
        faculty_branch: branch,
        role: dbRole,
      },
      attributes: [
        "f_id",
        "faculty_name",
        "mail",
        "faculty_branch",
        "password",
      ],
    });

    res.status(200).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Get multiple faculty by ids
exports.getFacultyByIds = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ message: "Faculty ids required" });
    }

    const idArray = ids.split(",").map(Number);

    const faculty = await Faculty.findAll({
      where: {
        f_id: idArray,
      },
      attributes: [
  "f_id",
  "faculty_name",
  "mail",
  "faculty_branch",
  "password",
]
    });

    res.status(200).json(faculty);
  } catch (err) {
    console.error("❌ getFacultyByIds error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Add counsellor
exports.addFaculty = async (req, res) => {
  try {
    const { faculty_name, faculty_branch, mail, role, password } = req.body;

    const faculty = await Faculty.create({
      faculty_name,
      faculty_branch,
      mail,
      role,
      password, // ✅ store entered password
    });

    res.status(201).json(faculty);
  } catch (err) {
  console.error("❌ addFaculty FULL error:", err);

  return res.status(500).json({
    message: "Server error",
    error: err.message,
    sqlMessage: err.parent?.sqlMessage,
  });
}
};

// ✅ Update faculty
exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    await Faculty.update(
      {
        faculty_name: req.body.name,
        faculty_branch: req.body.branch,
        mail: req.body.email,
        password: req.body.password, // ✅ IMPORTANT
      },
      {
        where: { f_id: id },
      }
    );

    res.status(200).json({ message: "Faculty updated" });
  } catch (err) {
    console.error("❌ updateFaculty error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    await Faculty.destroy({
      where: { f_id: id },
    });

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (err) {
    console.error("❌ deleteFaculty error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


