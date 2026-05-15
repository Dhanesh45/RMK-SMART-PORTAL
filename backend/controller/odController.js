const sequelize = require("../db");
const Outpass = require("../models/outpass");
const ODForm = require("../models/od_form");
const Student = require("../models/student");
const { Op } = require("sequelize");
const Faculty = require("../models/faculty");

// ✅ Create OD + Outpass
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

    let facultyId = null;
    const counsellorValue = student.counsellor;

    if (counsellorValue) {
      const trimmed = String(counsellorValue).trim();
      if (/^\d+$/.test(trimmed)) {
        facultyId = parseInt(trimmed, 10);
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

    // ✅ FROM OLD — count odAvailed
    const odAvailed = await ODForm.count({
      where: {
        student_id: student.studentId,
        cstatus: { [Op.gte]: 0 },
      },
    });

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
        date: od.date,
        odAvailed: odAvailed + 1,   // ✅ FROM OLD
        counsellorComments: null,   // ✅ FROM OLD
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

// ✅ Counsellor fetch hosteller OD
const getHostellerODForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const ODhosteller = await ODForm.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 0,
      },
      order: [["date", "DESC"]],
    });

    return res.json({ ODhosteller });
  } catch (err) {
    console.error("getHostellerODForCounsellor error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Counsellor fetch OD outpass
const getODoutpassforCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const where = { facultyId: Number(facultyId) };
    if (status !== undefined) where.cstatus = Number(status);

    const outpasswithod = await Outpass.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 0,
      },
      order: [["dateOfApplication", "DESC"]],
    });

    return res.json({ outpasswithod });
  } catch (err) {
    console.error("getODoutpassforCounsellor error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Counsellor approve/reject OD — FROM OLD: saves remarks + parentsPermission + forwards to YC
const updateCstatushosod = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { od_id } = req.params;
    const { action, remarks, parentsPermission } = req.body; // ✅ FROM OLD

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const hostod = await ODForm.findByPk(od_id, { transaction });
    if (!hostod)
      return res.status(404).json({ message: "OD not found" });

    const newStatus = action === "approve" ? 1 : -1;

    hostod.cstatus = newStatus;
    hostod.counsellorComments = remarks; // ✅ FROM OLD
    await hostod.save({ transaction });

    // ✅ FROM OLD — sync outpass with remarks + parentsPermission
    await Outpass.update(
      {
        cstatus: newStatus,
        remarks: remarks || null,
        parentsPermission: parentsPermission || "NOT_PERMITTED",
      },
      { where: { outpassId: hostod.outpass_id }, transaction }
    );

    // ✅ Auto-forward to Year Coordinator on approve
    if (action === "approve") {
      const student = await Student.findByPk(hostod.student_id, { transaction });

      if (student && student.yearCoordinator) {
        hostod.facultyId = Number(student.yearCoordinator);
        hostod.ystatus = 0;
      } else {
        console.warn(`Student ${hostod.student_id} has no year coordinator assigned`);
      }

      await Outpass.update(
        { facultyId: hostod.facultyId, ystatus: 0 },
        { where: { outpassId: hostod.outpass_id }, transaction }
      );

      await hostod.save({ transaction });
    }

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

// ✅ Year Coordinator view ODs
const getODForYearCoordinator = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const ods = await ODForm.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 1,
        ystatus: 0,
      },
      order: [["date", "DESC"]],
    });

    res.json({ ods });
  } catch (err) {
    console.error("getODForYearCoordinator error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Year Coordinator view Outpass for OD
const getODOutpassForYearCoordinator = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const outpasses = await Outpass.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 1,
        ystatus: 0,
        forOd: true,
      },
      order: [["dateOfApplication", "DESC"]],
    });

    res.json({ outpasses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 1️⃣1️⃣ YEAR COORDINATOR APPROVE / REJECT OD
const updateYstatusOD = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const od = await ODForm.findByPk(od_id, { transaction });
    if (!od) return res.status(404).json({ message: "OD not found" });

    const status = action === "approve" ? 1 : -1;

    od.ystatus = status;
    await od.save({ transaction });

    await Outpass.update(
      { ystatus: status },
      { where: { outpassId: od.outpass_id }, transaction }
    );
 // 🔥 NEW LOGIC: TRANSFER OWNERSHIP ONLY IF APPROVED
    if (action === "approve") {
      // 👉 Get student to find year coordinator
      const student = await Student.findByPk(od.student_id, { transaction });

      if (student && student.hod) {
        od.facultyId = Number(student.hod);
        od.hstatus = 0; // reset HOD status
      } else {
        console.warn(`Student ${od.studentId} has no HOD assigned`);
      }
      await Outpass.update({facultyId: od.facultyId, hstatus: 0}, 
        { where: { outpassId: od.outpass_id }, transaction  });
      await od.save({ transaction });
    }
    await transaction.commit();
    res.json({ message: `OD ${action}d successfully (Outpass synced + forwarded to HOD)` });

  } catch (err) {
    await transaction.rollback();
    console.error("updateYstatusOD error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// 8️⃣ HOD – VIEW OD (Counsellor Approved)
const getODForHOD = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const ods = await ODForm.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 1,   // counsellor approved
        ystatus: 1,
        hstatus: 0     // pending HOD
      },
      order: [["date", "DESC"]],
    });

    res.json({ ods });
  } catch (err) {
    console.error("getODForHOD error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getODOutpassForHOD = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const outpasses = await Outpass.findAll({
      where: {
        facultyId: Number(facultyId),  // ✅ FIXED
        cstatus: 1,
        ystatus: 1,
        hstatus: 0,
        forOd: true
      },
      order: [["dateOfApplication", "DESC"]],
    });

    res.json({ outpasses });
  } catch (err){
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateHstatusOD = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { od_id } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const od = await ODForm.findByPk(od_id, { transaction });
    if (!od) return res.status(404).json({ message: "OD not found" });

    const status = action === "approve" ? 1 : -1;

    od.hstatus = status;
    await od.save({ transaction });

    await Outpass.update(
      { hstatus: status },
      { where: { outpassId: od.outpass_id }, transaction }
    );

    await transaction.commit();
    res.json({ message: `OD ${action}d successfully (Outpass synced + forwarded to HOD)` });

  } catch (err) {
    await transaction.rollback();
    console.error("updateYstatusOD error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ FROM OLD — Get full OD details (used by ONDUTY + OUTPASS popup)
const getFullODDetails = async (req, res) => {
  try {
    const { od_id } = req.params;

    const od = await ODForm.findOne({
      where: { od_id },
      include: [
        {
          model: Student,
          attributes: [
            "studentName", "regNo", "year", "branch",
            "section", "gender", "studentMail", "native",
          ],
          include: [
            {
              model: Faculty,
              as: "YearCoordinator",
              attributes: ["faculty_name"],
            },
          ],
        },
        {
          model: Outpass,
          include: [
            {
              model: Faculty,
              attributes: ["faculty_name"],
            },
          ],
        },
      ],
    });

    if (!od) {
      return res.status(404).json({ message: "OD not found" });
    }

    const odJson = od.toJSON();
    const studentJson = odJson.student || {};
    const outpassJson = odJson.Outpass || {};

    const odAvailed = await ODForm.count({
      where: {
        student_id: odJson.student_id,
        cstatus: { [Op.gte]: 0 },
      },
    });

    const counsellorName = outpassJson.Faculty?.faculty_name || "Not Assigned";
    const yearCoordinatorName = studentJson.YearCoordinator?.faculty_name || "Not Assigned";

    const response = {
      od_id: odJson.od_id,
      student_id: odJson.student_id,
      facultyId: odJson.facultyId,
      outpass_id: odJson.outpass_id,
      purpose: odJson.purpose,
      numberOfDays: odJson.numberOfDays,
      fromDate: odJson.fromDate,
      toDate: odJson.toDate,
      place: odJson.place,
      collegeName: odJson.collegeName,
      eventName: odJson.eventName,
      date: odJson.date,
      cstatus: odJson.cstatus,
      ystatus: odJson.ystatus,
      hstatus: odJson.hstatus,
      counsellorComments: odJson.counsellorComments || "",
      odAvailed,

      outpassId: outpassJson.outpassId,
      studentName: outpassJson.studentName,
      regNo: outpassJson.regNo,
      year: outpassJson.year,
      branch: outpassJson.branch,
      parentName: outpassJson.parentName,
      parentPhone: outpassJson.parentPhone,
      roomNumber: outpassJson.roomNumber,
      noOfDays: outpassJson.noOfDays,
      leavingDate: outpassJson.leavingDate,
      leavingTime: outpassJson.leavingTime,
      reasonForLeave: outpassJson.reasonForLeave,
      parentsPermission: outpassJson.parentsPermission,
      remarks: outpassJson.remarks,

      student: {
        studentName: studentJson.studentName,
        regNo: studentJson.regNo,
        year: studentJson.year,
        branch: studentJson.branch,
        section: studentJson.section,
        gender: studentJson.gender,
        studentMail: studentJson.studentMail,
        native: studentJson.native,
        counsellor: counsellorName,
        yearCoordinator: yearCoordinatorName,
      },
    };

    return res.json(response);
  } catch (err) {
    console.error("getFullODDetails error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createODWithOutpass,
  getHostellerODForCounsellor,
  getODoutpassforCounsellor,
  updateCstatushosod,
  getODForYearCoordinator,
  getODOutpassForYearCoordinator,
  getODForHOD,
  getODOutpassForHOD,
  updateHstatusOD,  
  updateYstatusOD,
  getFullODDetails,
};
