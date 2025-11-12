// controllers/daysoutpassController.js
const DayScholarOutpass = require("../models/dayscholar_outpass");
const Student = require("../models/student");

/** ✅ Fetch student by regNo */
const getStudentByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;
    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    console.error("❌ Error fetching student:", err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

/** ✅ Create Day Scholar Outpass */
const createDayScholarOutpass = async (req, res) => {
  try {
    // Destructure all needed fields from the request body
    const { regNo, reason, fromDate, toDate, leavingTime, parentPermission } = req.body;

    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // The fields provided in the `create` function MUST match the property names in your Sequelize model (dayscholar_outpass.js)
    const newOutpass = await DayScholarOutpass.create({
      // 1. Foreign Key
      studentId: student.studentId,

      // 2. User-input fields, mapped to the correct model properties:
      reason: reason, // Maps to "Purpose of Leaving" DB column
      date: fromDate, // FIX: Maps from 'fromDate' (req.body) to 'date' (model property)
      time: leavingTime, // FIX: Maps from 'leavingTime' (req.body) to 'time' (model property)
      parentPermission: parentPermission, // Maps to "Parent Permission" DB column

      // 3. Auto-filled/Redundant student details (only include columns that exist in the dayscholars_outpass table)
      parentName: student.parentName, // This field exists in your DayscholarsOutpass model
      parentNumber: student.parentPhone, // This field exists in your DayscholarsOutpass model
      
      // Optional: Use remarks to save the 'toDate' since your model doesn't have a dedicated 'toDate' column
      remarks: toDate ? `Return Date: ${toDate}` : null,
      
      // NOTE: Fields like studentName, regNo, year, branch, section, and counsellor
      // are NOT columns in the DayscholarsOutpass model and should not be included here.
    });

    res.status(201).json({ message: "✅ Day Scholar Outpass Created", newOutpass });
  } catch (err) {
    console.error("❌ Error creating Day Scholar Outpass:", err);
    res.status(500).json({ error: "Failed to create outpass" });
  }
};

module.exports = { getStudentByRegNo, createDayScholarOutpass };