// backend/route/studentRoute.js
const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// 🔹 Fetch a student by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // ✅ Fixed: defined id
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
