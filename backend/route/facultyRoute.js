const express = require("express");
const { getCounsellorsByBranch } = require("../controller/facultyController");

const router = express.Router();

router.get("/by-branch/:branch", getCounsellorsByBranch);

module.exports = router;
