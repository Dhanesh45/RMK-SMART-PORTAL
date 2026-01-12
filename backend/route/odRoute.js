const express = require("express");
const router = express.Router();

const {
  createODWithOutpass,
  getHostellerODForCounsellor,
  getODoutpassforCounsellor,
  updateCstatushosod,
  updateCstatusOdOut,
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

module.exports = router;
