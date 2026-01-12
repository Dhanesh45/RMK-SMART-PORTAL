// route/facultyRoute.js

const express = require("express");
const router = express.Router();
const { facultyLogin } = require("../controller/facultyController");
const { getFacultyByBranchAndRole } = require("../controller/facultyController");

router.post("/login", facultyLogin);
const { getFacultyByEmail } = require("../controller/facultyController");

router.get("/email/:email", getFacultyByEmail);

router.get(
  "/by-branch-role/:branch/:role",
  getFacultyByBranchAndRole
);


module.exports = router;



