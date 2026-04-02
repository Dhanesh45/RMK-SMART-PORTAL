const express = require("express");
const router = express.Router();

const {
  createODWithOutpass,
  getHostellerODForCounsellor,
  getODoutpassforCounsellor,
  updateCstatushosod,
  updateCstatusOdOut,

  // ✅ NEW YC FUNCTIONS
  getYearCoordinatorODs,
  updateYstatushosod,
  updateYstatusOdOut,

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
 */
router.get("/counsellor/:facultyId", getHostellerODForCounsellor);

/**
 * ===============================
 * COUNSELLOR FETCH OUTPASS
 * ===============================
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
 * COUNSELLOR APPROVE / REJECT OUTPASS
 * ===============================
 */
//router.put("/approve/outpass/:outpassId", updateCstatusOdOut);

/**
 * ===============================
 * 🔥 MOVE TO YEAR COORDINATOR (NEW)
 * ===============================
 */
// router.put("/assign-yc/:od_id", assignYearCoordinatorOD);

/**
 * ===============================
 * YEAR COORDINATOR FETCH OD
 * ===============================
 */
router.get("/year-coordinator/:facultyId", getYearCoordinatorODs);

/**
 * ===============================
 * YEAR COORDINATOR APPROVE / REJECT OD
 * ===============================
 */
router.get(
  "/year-coordinator/outpass/:facultyId",///outpass/counsellor/:facultyId
  getODOutpassForYearCoordinator
);

/**
 * ===============================
 * YEAR COORDINATOR APPROVE / REJECT OUTPASS
 * ===============================
 */
router.put("/year-coordinator/approve/outpass/:outpassId",updateYstatusOdOut );

module.exports = router;