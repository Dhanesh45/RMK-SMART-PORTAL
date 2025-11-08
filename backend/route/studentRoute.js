const express = require("express");
const { registerStudent, getAllStudents ,loginStudent } = require("../controller/studentController");

const router = express.Router();

// ✅ Register new student
router.post("/register", registerStudent);

// ✅ Get all students
router.get("/all", getAllStudents);

//Dhanesh Work
router.post("/login", loginStudent);

module.exports = router;
