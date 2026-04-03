const express = require("express");
const router = express.Router();
const { loginOfficeStaff } = require("../controller/officeStaffController");

router.post("/login", loginOfficeStaff);

module.exports = router;