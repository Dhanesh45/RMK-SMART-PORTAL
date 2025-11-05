// route/studentRoute.js
const express = require("express");
const router = express.Router();
const {
  registerStudent,
  getAllStudents,
} = require("../controller/studentController");
const Student = require("../models/student");

// ✅ Register new student
router.post("/register", registerStudent);

// ✅ Get all students
router.get("/all", getAllStudents);

// ✅ Get single student by ID (sid)
router.get("/:sid", async (req, res) => {
  try {
    const { sid } = req.params;
    const student = await Student.findByPk(sid);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
