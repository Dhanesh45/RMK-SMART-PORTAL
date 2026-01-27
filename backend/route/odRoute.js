const express = require("express");
const router = express.Router();

const {
  createODWithOutpass,
  getHostellerODForCounsellor,
  getODoutpassforCounsellor,
  updateCstatushosod,
  updateCstatusOdOut,
 getODOutpassForYearCoordinator,
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
 * optional query: ?status=0 | 1 | -1
 */
router.get("/counsellor/:facultyId", getHostellerODForCounsellor);

/**
 * ===============================
 * COUNSELLOR FETCH OD OUTPASS
 * ===============================
 * /api/od/outpass/counsellor/:facultyId
 * optional query: ?status=0 | 1 | -1
 */
router.get("/outpass/counsellor/:facultyId", getODoutpassforCounsellor);

/**
 * ===============================
 * COUNSELLOR APPROVE / REJECT OD
 * ===============================
 * body: { action: "approve" | "reject" }
 */
router.put("/approve/od/:od_id", updateCstatushosod);

/**
 * ===============================
 * COUNSELLOR APPROVE / REJECT OD OUTPASS
 * ===============================
 * body: { action: "approve" | "reject" }
 */
router.put("/approve/outpass/:outpassId", updateCstatusOdOut);


// YEAR COORDINATOR ROUTES

/**
 * ===============================
 * YEAR COORDINATOR FETCH APPROVED BY COUNSELLOR
 * ===============================
 * /api/od/year-coordinator/:facultyId
 * shows only counsellor-approved records
 */
// YEAR COORDINATOR – FETCH OD (ONDUTY)
// YEAR COORDINATOR – FETCH OD (Counsellor approved)
// YEAR COORDINATOR – FETCH OUTPASS (OD)
router.get(
  "/year-coordinator/:facultyId",
  getODOutpassForYearCoordinator
);



// YEAR COORDINATOR – APPROVE / REJECT OD
// YEAR COORDINATOR – APPROVE / REJECT OD
router.put(
  "/year-coordinator/approve/od/:od_id",
  updateYstatusOD
);



module.exports = router;
