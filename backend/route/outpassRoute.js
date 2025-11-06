const express = require("express");
const router = express.Router();
const { getStudentByRegNo, createOutpass } = require("../controller/outpassController");

router.get("/:regNo", getStudentByRegNo);
router.post("/", createOutpass);

module.exports = router;
