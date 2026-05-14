const express = require("express");
const router = express.Router();

const {
  getStudentForDayscholarOD,
  createDayscholarOD,
  getdayscholarODForCounsellor,
  getDayscholarODById,
  getDayscholarODForYearCoordinator,
  updateYstatusDayscholarOD,
  updateCstatus,
} = require("../controller/dayscholarOdController");

// ✅ Year Coordinator — get pending ODs
router.get("/year-coordinator/:facultyId", getDayscholarODForYearCoordinator);

// ✅ Year Coordinator — approve/reject
router.put("/ystatus/:od_id", updateYstatusDayscholarOD);

// ✅ Counsellor — get pending ODs
router.get("/counsellor/:facultyId", getdayscholarODForCounsellor);

// ✅ Counsellor — approve/reject
router.put("/cstatus/:od_id", updateCstatus);

// ✅ FROM OLD — Get single OD by od_id (ONDUTY button) — MUST be before /:regNo
router.get("/od/:od_id", getDayscholarODById);

// ✅ Create new OD
router.post("/", createDayscholarOD);

// ⚠️ KEEP LAST — dynamic catch-all
router.get("/:regNo", getStudentForDayscholarOD);

module.exports = router;