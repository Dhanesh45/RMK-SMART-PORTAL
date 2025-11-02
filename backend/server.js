const express = require("express");
const sequelize = require("./db");
require("dotenv").config();

// Import models to ensure they are registered with Sequelize
require("./models/student");
require("./models/faculty");
require("./models/office_staff");
require("./models/outpass");
require("./models/od_form");
require("./models/dayscholar_outpass");
require("./models/application_form");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Test MySQL connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully!");
    // Sync all models now that associations are defined in their files
    await sequelize.sync({ alter: true });
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running on 🚀 and DB is connected ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
