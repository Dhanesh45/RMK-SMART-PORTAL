// route/facultyRoute.js

const express = require("express");
const router = express.Router();
const { facultyLogin } = require("../controller/facultyController");

router.post("/login", facultyLogin);
const { getFacultyByEmail } = require("../controller/facultyController");

router.get("/email/:email", getFacultyByEmail);

const { getCounsellorsByBranch } = require("../controller/facultyController");

router.get("/by-branch/:branch", getCounsellorsByBranch);

module.exports = router;



