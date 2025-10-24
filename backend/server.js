const express = require("express");
const sequelize = require("./db"); // ✅ CommonJS import
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Test MySQL connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error.message);
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
