const express = require("express");
const router = express.Router();

const {
  facultyLogin,
  getFacultyByEmail,
  getFacultyByBranchAndRole,
  getFacultyByIds,
  addFaculty,
  updateFaculty,
  deleteFaculty, // ✅ must exist
} = require("../controller/facultyController");

router.post("/login", facultyLogin);
router.get("/email/:email", getFacultyByEmail);
router.get("/by-branch-role/:branch/:role", getFacultyByBranchAndRole);
router.get("/by-ids", getFacultyByIds);

router.post("/add", addFaculty);
router.put("/:id", updateFaculty);
router.delete("/:id", deleteFaculty); // ✅ works now

module.exports = router;