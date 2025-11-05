require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const Student = require("./models/student");
const ApplicationForm = require("./models/application_form");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Error:", err));

// ✅ Sync models
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Tables synced"))
  .catch((err) => console.error("❌ Sync error:", err));

/* -------------------- ROUTES -------------------- */

// 🔹 Get student details by ID
app.get("/api/student/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// 🔹 Submit Bonafide Form
app.post("/api/application-form", async (req, res) => {
  try {
    const {
      studentId,
      reason,
      year,
      fatherName,
      section,
      houseNo,
      dob,
      age,
      street,
      area,
      city,
      state,
      pincode,
      category,
      boardingPlace,
      bonafideType,
    } = req.body;

    // ✅ Ensure student exists
    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const form = await ApplicationForm.create({
      studentId,
      reason,
      year,
      fatherName,
      section,
      houseNo,
      dob,
      age,
      street,
      area,
      city,
      state,
      pincode,
      category,
      boardingPlace,
      bonafideType,
    });

    res.json({ message: "Application submitted successfully", form });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting form", error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
