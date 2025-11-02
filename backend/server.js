const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
require("dotenv").config();

// Import models (ensure all are loaded before syncing)
require("./models/student");
require("./models/faculty");
require("./models/office_staff");
require("./models/outpass");
require("./models/od_form");
require("./models/dayscholar_outpass");
require("./models/application_form");

// Import routes
const studentRoute = require("./route/studentRoute");

const app = express();
const PORT = process.env.PORT || 5000;


// Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:5174", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running on 🚀 and DB is connected ✅");
});

// Student routes
app.use("/api/student", studentRoute);

// Connect and sync database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully!");
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
})();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
