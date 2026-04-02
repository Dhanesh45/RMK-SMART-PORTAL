const express = require("express");
const router = express.Router();

const {
  facultyLogin,
  getFacultyByEmail,
  getFacultyByBranchAndRole,
  getFacultyByIds,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} = require("../controller/facultyController");

router.post("/login", facultyLogin);
router.get("/email/:email", getFacultyByEmail);
router.get("/by-branch-role/:branch/:role", getFacultyByBranchAndRole);
router.get("/by-ids", getFacultyByIds);

// ✅ CRUD
router.post("/add", addFaculty);
router.put("/:id", updateFaculty);
router.delete("/:id", deleteFaculty);

module.exports = router;