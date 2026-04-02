// dayscholarODRoute.js

const express = require("express");
const router = express.Router();

const {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getdayscholarODForCounsellor,
 
  getDayscholarODForYearCoordinator,
  updateYstatusDayscholarOD,
  updateCstatus,
} = require("../controller/dayscholarOdController");



// ✅ Get OD for Year Coordinator
router.get(
  "/year-coordinator/:facultyId",
  getDayscholarODForYearCoordinator
);

// ✅ Update Year Coordinator status
router.put("/ystatus/:od_id", updateYstatusDayscholarOD);

// ✅ Get OD for Counsellor
router.get(
  "/counsellor/:facultyId",
  getdayscholarODForCounsellor
);

// ✅ Update Counsellor status
router.put("/cstatus/:od_id", updateCstatus);

// ✅ Create new OD
router.post("/", createDayscholarOD);

// ⚠️ KEEP THIS LAST (dynamic route)
router.get("/:regNo", getStudentForDayscholarOD);

module.exports = router;