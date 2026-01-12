// controller/outpassController.js

const { Op } = require("sequelize");
const Outpass = require("../models/outpass");
const Student = require("../models/student");
const Faculty = require("../models/faculty");

/** ================================
 * 1️⃣ GET Student by regNo  (OLD FLOW) 
 * ================================ */
exports.getStudentByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({ where: { regNo } });

    if (!student) return res.status(404).json({ message: "Student not found" });

    return res.status(200).json(student);
  } catch (err) {
    console.error("❌ Error fetching student:", err);
    return res.status(500).json({ error: "Failed to fetch student" });
  }
};

/** ================================
 * 2️⃣ CREATE OUTPASS (OLD FLOW + COUNSELLOR SUPPORT)
 * ================================ */
exports.createOutpass = async (req, res) => {
  try {
    const {
      regNo,
      roomNumber,
      noOfDays,
      fromDate,
      toDate,
      reasonForLeave,
      parentsPermission,
      forOd,
      leavingDate,
      leavingTime,
      remarks,
    } = req.body;

    // Find student by regNo (OLD FLOW)
    const student = await Student.findOne({ where: { regNo } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    /** 🔥 NEW: Find counsellor to assign facultyId */
    let facultyId = null;
    const counsellorValue = student.counsellor;

    if (counsellorValue) {
      const trimmed = String(counsellorValue).trim();

      if (/^\d+$/.test(trimmed)) {
        facultyId = parseInt(trimmed, 10);   // stored faculty numeric ID
      } else {
        const faculty = await Faculty.findOne({
          where: {
            [Op.or]: [
              { faculty_name: trimmed },
              { mail: trimmed }
            ]
          }
        });
        if (faculty) facultyId = faculty.f_id;
      }
    }

    /** 🔥 Create Outpass (original logic + facultyId included) */
    const newOutpass = await Outpass.create({
      studentId: student.studentId,
      studentName: student.studentName,
      regNo: student.regNo,
      year: student.year,
      branch: student.branch,
      parentName: student.parentName,
      parentPhone: student.parentPhone,

      facultyId,  // <-- NEW

      roomNumber,
      noOfDays,
      fromDate,
      toDate,
      reasonForLeave,
      parentsPermission,
      forOd,
      leavingDate,
      leavingTime,
      remarks: remarks || null,

      dateOfApplication: new Date(),

      cstatus: 0,
      ystatus: 0,
      hstatus: 0,
    });

    return res.status(201).json({
      message: "Outpass created",
      newOutpass,
    });
  } catch (err) {
    console.error("❌ Error creating outpass:", err);
    return res.status(500).json({ error: "Failed to create outpass" });
  }
};

/** ================================
 * 3️⃣ COUNSELLOR VIEW OUTPASSES
 * ================================ */
exports.getOutpassesForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const outpasses = await Outpass.findAll({
      where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
      order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasses });
  } catch (err) {
    console.error("getOutpassesForCounsellor error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

/** ================================
 * 4️⃣ COUNSELLOR APPROVE / REJECT
 * ================================ */
exports.updateCstatus = async (req, res) => {
  try {
    const { outpassId } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const outpass = await Outpass.findByPk(outpassId);
    if (!outpass) return res.status(404).json({ message: "Outpass not found" });

    outpass.cstatus = action === "approve" ? 1 : -1;
    await outpass.save();

    return res.json({ message: `Outpass ${action}d`, outpass });
  } catch (err) {
    console.error("updateCstatus error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

/** ================================
 * 5️⃣ STUDENT VIEW THEIR OUTPASSES
 * ================================ */
exports.getOutpassesForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const outpasses = await Outpass.findAll({
      where: { studentId },
      order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasses });
  } catch (err) {
    console.error("getOutpassesForStudent error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
