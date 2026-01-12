const express = require("express");
const router = express.Router();
const {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getdayscholarODForCounsellor,
  updateCstatus,
} = require("../controller/dayscholarOdController");

router.get("/:regNo", getStudentForDayscholarOD);
router.post("/", createDayscholarOD);
router.get("/counsellor/:facultyId", getdayscholarODForCounsellor);
router.put("/cstatus/:od_id", updateCstatus);
module.exports = router;
