// server.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
require("dotenv").config();

// ✅ Import all models before syncing
require("./models/student");
require("./models/faculty");
require("./models/office_staff");
require("./models/outpass");
require("./models/od_form");
require("./models/dayscholar_outpass");
require("./models/application_form");
require("./models/dayscholor_od");

// ✅ Import routes
const studentRoute = require("./route/studentRoute");
const outpassRoute = require("./route/outpassRoute");
const dayscholarOutpassRoutes = require("./route/dayscholarRoute");
const bonafideRoute = require("./route/BonafideRoute");
const odRoute = require("./route/odRoute.js");
const dayscholarODRoute = require("./route/dayscholarOdRoute");





const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully ✅");
});

// ✅ Routes
app.use("/api/student", studentRoute);
app.use("/api/outpass", outpassRoute); // ✅ Use plural to match frontend
app.use("/api/dayscholarOutpass", dayscholarOutpassRoutes);
app.use("/api/bonafide", bonafideRoute);
app.use("/api/od", odRoute);
app.use("/api/dayscholar-od", dayscholarODRoute);

// ✅ Database connection + sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully!");

    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized successfully.");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
  }
})();

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});
