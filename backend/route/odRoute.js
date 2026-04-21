const express = require("express");
const router = express.Router();

const {
  createODWithOutpass,
  getHostellerODForCounsellor,
  getODoutpassforCounsellor,
  updateCstatushosod,
  getODForYearCoordinator,              // ✅ ADDED
  getODOutpassForYearCoordinator,
getODForHOD,
updateHstatusOD,
getODOutpassForHOD,          // ✅ (optional but useful)
  updateYstatusOD
} = require("../controller/odController");

/**
 * ===============================
 * CREATE OD + OUTPASS (HOSTELLER)
 * ===============================
 */
router.post("/", createODWithOutpass);

/**
 * ===============================
 * COUNSELLOR FETCH HOSTELLER OD
 * ===============================
 * /api/od/counsellor/:facultyId
 */
router.get("/counsellor/:facultyId", getHostellerODForCounsellor);

/**
 * ===============================
 * COUNSELLOR FETCH OD OUTPASS
 * ===============================
 * /api/od/outpass/counsellor/:facultyId
 */
router.get("/outpass/counsellor/:facultyId", getODoutpassforCounsellor);

/**
 * ===============================
 * COUNSELLOR APPROVE / REJECT OD
 * ===============================
 */
router.put("/approve/od/:od_id", updateCstatushosod);


/**
 * ===============================
 * YEAR COORDINATOR FETCH OD
 * ===============================
 * IMPORTANT: This is what your frontend expects
 */
router.get(
  "/year-coordinator/:facultyId",
  getODForYearCoordinator
);


/**
 * ===============================
 * YEAR COORDINATOR APPROVE / REJECT OD
 * ===============================
 */
router.put(
  "/year-coordinator/approve/od/:od_id",
  updateYstatusOD
);
//HOD routes


router.put(
  "/hod/approve/od/:od_id",
  updateHstatusOD
);


router.get(
  "/hod/:facultyId",
  getODForHOD
);
module.exports = router;