const express = require("express");
const router = express.Router();
const {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getdayscholarODForCounsellor,
  updateCstatus,
   getDayscholarODById,
} = require("../controller/dayscholarOdController");

router.get("/counsellor/:facultyId", getdayscholarODForCounsellor);
router.get("/od/:od_id", getDayscholarODById); // ✅ MUST be before /:regNo
router.get("/:regNo", getStudentForDayscholarOD);

router.post("/", createDayscholarOD);
router.put("/cstatus/:od_id", updateCstatus);
module.exports = router;
