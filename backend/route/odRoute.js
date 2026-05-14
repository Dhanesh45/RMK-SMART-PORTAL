const express = require("express");
const router = express.Router();

const {
  createODWithOutpass,
  getHostellerODForCounsellor,
  getODoutpassforCounsellor,
  updateCstatushosod,
  getODForYearCoordinator,
  getODOutpassForYearCoordinator,
  forwardODToYearCoordinator,
  updateYstatusOD,
  getFullODDetails,
} = require("../controller/odController");

// ✅ Create OD + Outpass
router.post("/", createODWithOutpass);

// ✅ Counsellor fetch hosteller OD
router.get("/counsellor/:facultyId", getHostellerODForCounsellor);

// ✅ Counsellor fetch OD outpass
router.get("/outpass/counsellor/:facultyId", getODoutpassforCounsellor);

// ✅ Counsellor approve/reject OD
router.put("/approve/od/:od_id", updateCstatushosod);

// ✅ Forward to Year Coordinator
router.put("/forward/:od_id", forwardODToYearCoordinator);

// ✅ Year Coordinator fetch OD
router.get("/year-coordinator/:facultyId", getODForYearCoordinator);

// ✅ Year Coordinator fetch Outpass for OD
router.get("/year-coordinator/outpass/:facultyId", getODOutpassForYearCoordinator);

// ✅ Year Coordinator approve/reject OD
router.put("/year-coordinator/approve/od/:od_id", updateYstatusOD);

// ✅ FROM OLD — Get full OD details (ONDUTY + OUTPASS popup)
router.get("/details/:od_id", getFullODDetails);

module.exports = router;