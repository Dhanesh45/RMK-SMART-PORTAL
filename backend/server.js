const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
require("dotenv").config();

// Import models
const Student = require("./models/student");
const ApplicationForm = require("./models/application_form");

// Import routes
const studentRoutes = require("./route/studentRoute");
const applicationFormRoutes = require("./route/applicationFormRoute");

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/applicationform", applicationFormRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 Student + ApplicationForm Backend Running Successfully!");
});

// Sync database
sequelize
  .sync({ alter: true }) // auto-sync models
  .then(() => {
    console.log("✅ Database synced successfully!");
  })
  .catch((err) => {
    console.error("❌ Database sync error:", err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
