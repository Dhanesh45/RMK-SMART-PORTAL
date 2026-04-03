const express = require("express");
const router = express.Router();

const {
  getStudentByRegNo,
  createOutpass,
  getOutpassesForCounsellor,
  updateCstatus,
  getOutpassesForStudent,
  getOutpassesForYearCoordinator,
  assignYearCoordinator,
  updateYstatus,
  getYearCoordinatorOutpasses,
} = require("../controller/outpassController");

/* -----------------------------------------
   STUDENT SIDE ROUTES 
--------------------------------------------*/

// 2️⃣ Student applies for outpass
router.post("/", createOutpass);

// 3️⃣ Student views their own outpasses
router.get("/student/outpasses/:studentId", getOutpassesForStudent);

/* -----------------------------------------
   COUNSELLOR SIDE ROUTES 
--------------------------------------------*/

// 4️⃣ Counsellor sees all outpasses
router.get("/counsellor/:facultyId", getOutpassesForCounsellor);

// 5️⃣ Counsellor approves / rejects
router.put("/counsellor/update/:outpassId", updateCstatus);

// 6️⃣ Forward outpass to Year Coordinator
router.put(
  "/counsellor/forward/:outpassId",
  assignYearCoordinator
);

/* -----------------------------------------
   YEAR COORDINATOR ROUTES ✅
--------------------------------------------*/

// 7️⃣ Year Coordinator sees ALL pending YC outpasses (optional, no faculty filter)
router.get("/year-coordinator", getOutpassesForYearCoordinator);

// 8️⃣ Year Coordinator sees THEIR pending outpasses (filtered by facultyId)
router.get("/year-coordinator/:facultyId", getYearCoordinatorOutpasses);

// 9️⃣ Assign Year Coordinator (optional)
router.post(
  "/year-coordinator/assign/:outpassId",
  assignYearCoordinator
);

// 🔟 Year Coordinator approves / rejects
router.put("/year-coordinator/update/:outpassId", updateYstatus);


// 1️⃣ Get student details using regNo
//    NOTE: placed LAST so it does not swallow more specific routes like /year-coordinator
router.get("/:regNo", getStudentByRegNo);

module.exports = router;
