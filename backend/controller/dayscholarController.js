// controllers/daysoutpassController.js
const DayscholarsOutpass = require("../models/dayscholar_outpass");
const DayScholarOutpass = require("../models/dayscholar_outpass");
const Faculty = require("../models/faculty");
const Student = require("../models/student");
const { Op } = require("sequelize");
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
    const { regNo, reason, fromDate, toDate, leavingTime, parentPermission } =
      req.body;

    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    /** 🔥 NEW: Find counsellor to assign facultyId */
    let facultyId = null;
    const counsellorValue = student.counsellor;

    if (counsellorValue) {
      const trimmed = String(counsellorValue).trim();

      if (/^\d+$/.test(trimmed)) {
        facultyId = parseInt(trimmed, 10); // stored faculty numeric ID
      } else {
        const faculty = await Faculty.findOne({
          where: {
            [Op.or]: [{ faculty_name: trimmed }, { mail: trimmed }],
          },
        });
        if (faculty) facultyId = faculty.f_id;
      }
    }

    // The fields provided in the `create` function MUST match the property names in your Sequelize model (dayscholar_outpass.js)
    const newOutpass = await DayScholarOutpass.create({
      // 1. Foreign Key
      studentId: student.studentId,
      facultyId,
      studentName: student.studentName,
      regNo: student.regNo,
      branch: student.branch,
      year: student.year,
      // 2. User-input fields, mapped to the correct model properties:
      reason: reason, // Maps to "Purpose of Leaving" DB column
      fromDate: fromDate, // FIX: Maps from 'fromDate' (req.body) to 'date' (model property)
      toDate: toDate,
      leavingTime: leavingTime, // FIX: Maps from 'leavingTime' (req.body) to 'time' (model property)
      parentPermission: parentPermission, // Maps to "Parent Permission" DB column

      // 3. Auto-filled/Redundant student details (only include columns that exist in the dayscholars_outpass table)
      parentName: student.parentName, // This field exists in your DayscholarsOutpass model
      parentNumber: student.parentPhone, // This field exists in your DayscholarsOutpass model
      dateOfApplication: new Date(),
      cstatus: 0,
      ystatus: 0,
      hstatus: 0,
      // Optional: Use remarks to save the 'toDate' since your model doesn't have a dedicated 'toDate' column
      remarks: null,

      // NOTE: Fields like studentName, regNo, year, branch, section, and counsellor
      // are NOT columns in the DayscholarsOutpass model and should not be included here.
    });

    res
      .status(201)
      .json({ message: "✅ Day Scholar Outpass Created", newOutpass });
  } catch (err) {
    console.error("❌ Error creating Day Scholar Outpass:", err);
    res.status(500).json({ error: "Failed to create outpass" });
  }
};
const getOutpassesForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const outpasses = await DayscholarsOutpass.findAll({
      where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
      order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasses });
  } catch (err) {
    console.error("getOutpassesForCounsellor error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const updateCstatus = async (req, res) => {
  try {
    const { dayscholaroutpassId } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const outpass = await DayScholarOutpass.findByPk(dayscholaroutpassId);
    if (!outpass) return res.status(404).json({ message: "Outpass not found" });

    outpass.cstatus = action === "approve" ? 1 : -1;
    await outpass.save();

    return res.json({ message: `Outpass ${action}d`, outpass });
  } catch (err) {
    console.error("updateCstatus error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const getOutpassesForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const outpasses = await DayScholarOutpass.findAll({
      where: { studentId },
      order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasses });
  } catch (err) {
    console.error("getOutpassesForStudent error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
module.exports = {
  getStudentByRegNo,
  createDayScholarOutpass,
  getOutpassesForCounsellor,
  updateCstatus,
  getOutpassesForStudent,
};
