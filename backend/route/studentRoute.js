const express = require("express");
const { registerStudent, getAllStudents } = require("../controller/studentController");

const router = express.Router();

// ✅ Register new student
router.post("/register", registerStudent);

// ✅ Get all students
router.get("/all", getAllStudents);

module.exports = router;
