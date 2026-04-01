const express = require("express");
const { 
  registerStudent, 
  getAllStudents, 
  loginStudent,
  getStudentsByCounsellor,
  getStudentsByYearCoordinator,
  deleteStudent,
  updateStudent
} = require("../controller/studentController");
console.log("✅ studentRoute loaded");

const router = express.Router();

// ✅ Register new student
router.post("/register", registerStudent);

// ✅ Get all students
router.get("/all", getAllStudents);

//Dhanesh Work
router.post("/login", loginStudent);

router.get("/counsellor/:f_id", getStudentsByCounsellor);

router.delete("/:id", deleteStudent);

router.put("/:id", updateStudent);




router.get(
  "/year-coordinator/:f_id",
  getStudentsByYearCoordinator
);


module.exports = router;
