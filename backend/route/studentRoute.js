const express = require("express");
const { 
  registerStudent, 
  getAllStudents, 
  loginStudent,
  getStudentsByCounsellor,
  getStudentsByHod,
  getStudentsByYearCoordinator,
  deleteStudentByYearCoordinator,
  updateStudentByYearCoordinator,
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
router.delete("/:studentId", deleteStudentByYearCoordinator);
router.put("/:studentId", updateStudentByYearCoordinator);


router.get(
  "/year-coordinator/:f_id",
  getStudentsByYearCoordinator
);
router.get("/hod/:f_id", getStudentsByHod);



module.exports = router;