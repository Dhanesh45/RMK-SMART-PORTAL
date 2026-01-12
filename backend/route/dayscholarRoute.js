const express = require("express");
const router = express.Router();

// Path must match your file exactly
const dayscholarController = require("../controller/dayscholarController");

// Correct function names from your controller
router.post("/create", dayscholarController.createDayScholarOutpass);
router.get("/student/:regNo", dayscholarController.getStudentByRegNo);
router.get("/student/outpasses/:studentId", dayscholarController.getOutpassesForStudent);

router.get("/counsellor/:facultyId", dayscholarController.getOutpassesForCounsellor);

// 5️⃣ Counsellor approves/rejects outpass
router.put("/counsellor/update/:dayscholaroutpassId", dayscholarController.updateCstatus);

module.exports = router;
