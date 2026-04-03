const express = require("express");
const router = express.Router();

const dayscholarController = require("../controller/dayscholarController");

router.post("/create", dayscholarController.createDayScholarOutpass);
router.get("/student/:regNo", dayscholarController.getStudentByRegNo);
router.get("/student/outpasses/:studentId", dayscholarController.getOutpassesForStudent);

router.get("/counsellor/:facultyId", dayscholarController.getOutpassesForCounsellor);
router.put("/counsellor/update/:dayscholaroutpassId", dayscholarController.updateCstatus);

// ✅ ADD THIS FOR YEAR COORDINATOR
router.get("/year-coordinator/:facultyId", dayscholarController.getYearCoordinatorOutpasses);
router.put("/year-coordinator/update/:dayscholaroutpassId", dayscholarController.updateYstatus);
router.post(
  "/year-coordinator/assign/:outpassId",
  dayscholarController.assignYearCoordinator
);
module.exports = router;
