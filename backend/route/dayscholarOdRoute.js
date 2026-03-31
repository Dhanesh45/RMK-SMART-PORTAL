const express = require("express");
const router = express.Router();
const {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getdayscholarODForCounsellor,
  forwardDayscholarODToYC,
  getDayscholarODForYearCoordinator,
  updateYstatusDayscholarOD,
  updateCstatus,
} = require("../controller/dayscholarOdController");


router.put("/forward/:od_id", forwardDayscholarODToYC);

router.get(
  "/year-coordinator/:facultyId",
  getDayscholarODForYearCoordinator
);

router.put(
  "/ystatus/:od_id",
  updateYstatusDayscholarOD
);
router.get("/:regNo", getStudentForDayscholarOD);
router.post("/", createDayscholarOD);
router.get("/counsellor/:facultyId", getdayscholarODForCounsellor);
router.put("/cstatus/:od_id", updateCstatus);
module.exports = router;
