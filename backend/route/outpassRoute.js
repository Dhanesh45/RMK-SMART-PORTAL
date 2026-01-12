const express = require("express");
const router = express.Router();

const {
  getStudentByRegNo,
  createOutpass,
  getOutpassesForCounsellor,
  updateCstatus,
  getOutpassesForStudent,
} = require("../controller/outpassController");

/* -----------------------------------------
   STUDENT SIDE ROUTES 
--------------------------------------------*/

// 1️⃣ Get student details using regNo (old working flow)
router.get("/:regNo", getStudentByRegNo);

// 2️⃣ Student applies for outpass (old working flow)
router.post("/", createOutpass);

// 3️⃣ Student views their own outpasses (optional)
router.get("/student/outpasses/:studentId", getOutpassesForStudent);


/* -----------------------------------------
   COUNSELLOR SIDE ROUTES 
--------------------------------------------*/

// 4️⃣ Counsellor sees all outpasses of their students
router.get("/counsellor/:facultyId", getOutpassesForCounsellor);

// 5️⃣ Counsellor approves/rejects outpass
router.put("/counsellor/update/:outpassId", updateCstatus);


module.exports = router;
