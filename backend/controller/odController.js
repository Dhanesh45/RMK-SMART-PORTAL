// /odController.js
const sequelize = require("../db");
const Outpass = require("../models/outpass");
const ODForm = require("../models/od_form");
const Student = require("../models/student");
const { Op } = require("sequelize");
const Faculty = require("../models/faculty");
// od with outpass

const createODWithOutpass = async (req, res) => {
  const { od, outpass } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const student = await Student.findOne({
      where: { regNo: od.regNo },
    });

    if (!student) {
      await transaction.rollback();
      return res.status(404).json({ message: "Student not found" });
    }
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

    const createdOutpass = await Outpass.create(
      {
        studentId: student.studentId,
        facultyId,
        studentName: student.studentName,
      regNo: student.regNo,
        year: student.year,
        branch: student.branch,
        parentName: student.parentName,
        parentPhone: student.parentPhone,
        dateOfApplication: new Date(),
        forOd: true,
        cstatus: 0,
      ystatus: 0,
      hstatus: 0,
        ...outpass,
      },
      { transaction }
    );

    await ODForm.create(
      {
        student_id: student.studentId,
        facultyId,
        outpass_id: createdOutpass.outpassId,
        studentName: student.studentName,
      regNo: student.regNo,
        purpose: od.purpose,
        numberOfDays: od.numberOfDays,
        fromDate: od.fromDate,
        toDate: od.toDate,
        place: od.place,
        collegeName: od.collegeName,
        eventName: od.eventName,
        date:od.date,
        cstatus: 0,
      ystatus: 0,
      hstatus: 0,
        
      },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json({ message: "OD + Outpass created successfully" });

  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};
// GOKUL WORK/
const getHostellerODForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const ODhosteller = await ODForm.findAll({
       where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
      order: [["date", "DESC"]],
    });

    return res.json({ ODhosteller });
  } catch (err) {
    console.error("getHostellerODForCounsellor error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
const getODoutpassforCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const outpasswithod = await Outpass.findAll({
      where:{
        facultyId: Number(facultyId),
        cstatus:0,
      },
     order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasswithod });
  } catch (err) {
    console.error("getODoutpassforCounsellor error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// get od and outpass for counsellor separate functions has been completed 
const updateCstatushosod = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const hostod = await ODForm.findByPk(od_id, { transaction });
    if (!hostod)
      return res.status(404).json({ message: "OD not found" });

    const newStatus = action === "approve" ? 1 : -1;

    // ✅ Update OD status
    hostod.cstatus = newStatus;
    await hostod.save({ transaction });

    // ✅ Sync Outpass status automatically
    await Outpass.update(
      { cstatus: newStatus },
      { where: { outpassId: hostod.outpass_id }, transaction }
    );

    await transaction.commit();

    return res.json({
      message: `OD ${action}d successfully (Outpass synced)`,
    });
  } catch (err) {
    await transaction.rollback();
    console.error("updateCstatushosod error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateCstatusOdOut = async (req, res) => {
  try {
    const { outpassId } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    // ✅ Check linked OD
    const od = await ODForm.findOne({
      where: { outpass_id: outpassId },
    });

    if (!od)
      return res.status(404).json({ message: "Linked OD not found" });

    // ❌ Block outpass approval if OD not approved
    if (action === "approve" && od.cstatus !== 1) {
      return res.status(400).json({
        message: "Cannot approve outpass before OD approval",
      });
    }

    const OdOut = await Outpass.findByPk(outpassId);
    if (!OdOut)
      return res.status(404).json({ message: "Outpass not found" });

    OdOut.cstatus = action === "approve" ? 1 : -1;
    await OdOut.save();

    return res.json({
      message: `Outpass ${action}d successfully`,
      OdOut,
    });
  } catch (err) {
    console.error("updateCstatusOdOut error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createODWithOutpass, 
  getHostellerODForCounsellor, 
  getODoutpassforCounsellor, 
  updateCstatushosod,
   updateCstatusOdOut }; 