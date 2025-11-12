const express = require("express");
const router = express.Router();

// Path must match your file exactly
const dayscholarController = require("../controller/dayscholarController");

// Correct function names from your controller
router.post("/create", dayscholarController.createDayScholarOutpass);
router.get("/student/:regNo", dayscholarController.getStudentByRegNo);

module.exports = router;
