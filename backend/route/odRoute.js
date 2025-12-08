const express = require("express");
const router = express.Router();
const { createODWithOutpass } = require("../controller/odController");

router.post("/", createODWithOutpass);

module.exports = router;
