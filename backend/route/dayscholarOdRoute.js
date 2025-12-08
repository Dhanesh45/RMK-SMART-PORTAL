const express = require("express");
const router = express.Router();
const {
  getStudentForDayscholarOD,
  createDayscholarOD,
} = require("../controller/dayscholarOdController");

router.get("/:regNo", getStudentForDayscholarOD);
router.post("/", createDayscholarOD);

module.exports = router;
