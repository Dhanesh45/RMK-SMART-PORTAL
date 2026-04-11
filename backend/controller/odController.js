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
        parentsPermission: outpass.parentsPermission || "NOT_PERMITTED",
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
        date: od.date,
          // ✅ NEW FIELDS
    odAvailed: od.odAvailed || 0,
    counsellorComments: null,
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

const getHostellerODForCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    const data = await ODForm.findAll({
      where: {
        facultyId: Number(facultyId),
        cstatus: 0,
      },
      include: [
        {
          model: Outpass,
          include: [
            {
              model: Faculty,          // ✅ counsellor name via Outpass → Faculty
              attributes: ["faculty_name"],
            },
            {
              model: Student,
              attributes: [
                "studentName",
                "regNo",
                "year",
                "branch",
                "section",
                "gender",
                "studentMail",
                "native",
              ],
              include: [
                {
                  model: Faculty,
                  as: "YearCoordinator",  // ✅ year coordinator name via Student → Faculty
                  attributes: ["faculty_name"],
                },
              ],
            },
          ],
        },
      ],
      order: [["date", "DESC"]],
    });

    // ✅ Resolve names
    const result = data.map((od) => {
      const plain = od.toJSON();
      if (plain.Outpass) {
        plain.Outpass.counsellorName =
          plain.Outpass.Faculty?.faculty_name || "Not Assigned";
        plain.Outpass.yearCoordinatorName =
          plain.Outpass.Student?.YearCoordinator?.faculty_name || "Not Assigned";
      }
      return plain;
    });

    return res.json({ data: result });
  } catch (err) {
    console.error("getHostellerODForCounsellor error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getODoutpassforCounsellor = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const { status } = req.query;

    if (!facultyId)
      return res.status(400).json({ message: "facultyId is required" });

    // ✅ properly declared where object
    const where = {
      facultyId: Number(facultyId),
      cstatus: 0,
    };
    if (status !== undefined) where.cstatus = Number(status);

    const outpasswithod = await Outpass.findAll({
      where,
      include: [
        {
          model: Faculty,              // ✅ counsellor name directly from Outpass → Faculty
          attributes: ["faculty_name"],
        },
        {
          model: Student,
          attributes: [
            "studentName",
            "regNo",
            "year",
            "branch",
            "section",
            "gender",
            "studentMail",
            "native",
          ],
          include: [
            {
              model: Faculty,
              as: "YearCoordinator",   // ✅ year coordinator name via Student → Faculty
              attributes: ["faculty_name"],
            },
          ],
        },
      ],
      order: [["dateOfApplication", "DESC"]],
    });

    // ✅ Resolve names
    const result = outpasswithod.map((outpass) => {
      const plain = outpass.toJSON();
      plain.counsellorName = plain.Faculty?.faculty_name || "Not Assigned";
      plain.yearCoordinatorName =
        plain.Student?.YearCoordinator?.faculty_name || "Not Assigned";
      return plain;
    });

    return res.json({ outpasswithod: result });
  } catch (err) {
    console.error("getODoutpassforCounsellor error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateCstatushosod = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { od_id } = req.params;
    const { action, remarks, parentsPermission } = req.body;

    if (!["approve", "reject"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const hostod = await ODForm.findByPk(od_id, { transaction });
    if (!hostod)
      return res.status(404).json({ message: "OD not found" });

    const newStatus = action === "approve" ? 1 : -1;

    hostod.cstatus = newStatus;
    hostod.counsellorComments = remarks; 
    await hostod.save({ transaction });

    await Outpass.update(
      {
        cstatus: newStatus,
        remarks: remarks || null,
        parentsPermission: parentsPermission || "NOT_PERMITTED",
      },
      {
        where: { outpassId: hostod.outpass_id },
        transaction,
      }
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

    const od = await ODForm.findOne({
      where: { outpass_id: outpassId },
    });

    if (!od)
      return res.status(404).json({ message: "Linked OD not found" });

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

    // ✅ Count approved ODs for this student
    const odAvailed = await ODForm.count({
      where: {
        student_id: odJson.student_id,
        cstatus: 1,  // approved only
      },
    });

    const counsellorName =
      outpassJson.Faculty?.faculty_name || "Not Assigned";
    const yearCoordinatorName =
      studentJson.YearCoordinator?.faculty_name || "Not Assigned";

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
      counsellorComments: odJson.counsellorComments || "",  // ✅ NEW
      odAvailed,                                            // ✅ NEW - count from DB

      outpassId: outpassJson.outpassId,
      studentName: outpassJson.studentName,
      regNo: outpassJson.regNo,
      year: outpassJson.year,
      branch: outpassJson.branch,       // ✅ department comes from here
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
  updateCstatusOdOut,
  getFullODDetails,
};