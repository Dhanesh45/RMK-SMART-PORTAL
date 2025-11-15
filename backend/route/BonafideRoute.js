const express = require("express");
const router = express.Router();
const { getStudentByRegNo, createBonafide } = require("../controller/BonafideController");

// Get student details
router.get("/:regNo", getStudentByRegNo);

// Submit new Bonafide Application
router.post("/", createBonafide);

module.exports = router;
