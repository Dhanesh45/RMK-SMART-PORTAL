const express = require("express");

const router = express.Router();

const {
  getStudentByRegNo,
  createBonafide,

  getHodApplications,
  approveApplication,
  rejectApplication,
  approveAllApplications,
  rejectAllApplications,

  getOfficeApplications,
  officeApprove,
  officeReject,
  sendMailToStudent,
   getOsHistory,
  getGenerateApplications,
  
} = require("../controller/BonafideController");

/* HOD */
router.get("/hod/all", getHodApplications);

router.put("/hod/approve/:id", approveApplication);

router.put("/hod/reject/:id", rejectApplication);

router.put("/hod/approve-all", approveAllApplications);

router.put("/hod/reject-all", rejectAllApplications);

/* OFFICE */
router.get("/office/all", getOfficeApplications);

router.put("/office/approve/:id", officeApprove);

router.put("/office/reject/:id", officeReject);

router.get("/generate/all", getGenerateApplications);
/* STUDENT */
router.post("/", createBonafide);

router.get("/:regNo", getStudentByRegNo);

router.post("/generate/send-mail", sendMailToStudent);

router.get("/os-history", getOsHistory);  

module.exports = router;
