const db = require("../models");

const ApplicationForm = db.applicationForm;

const Student = db.student;
/* STUDENT GET */
const getStudentByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({
      where: { regNo },
    });

    res.json(student);
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};

/* CREATE BONAFIDE */
const createBonafide = async (req, res) => {
  try {
    const data = req.body;

    await ApplicationForm.create(data);

    res.json({
      message: "Application submitted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};

/* HOD VIEW */
const getHodApplications = async (req, res) => {
  try {
    const applications = await ApplicationForm.findAll({
      where: {
        hstatus: 0,
      },

      include: [
        {
          model: Student,
          as: "student",
          attributes: ["studentId", "studentName", "regNo", "branch"],
        },
      ],
    });

    res.json(applications);
  } catch (err) {
    console.error(err);

    res.status(500).json("Error fetching hod applications");
  }
};

/* HOD APPROVE */
const approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    await ApplicationForm.update(
      { hstatus: 1 },

      {
        where: { ap_id: id },
      },
    );

    res.json({
      message: "Approved",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};

/* HOD REJECT */
const rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;

    await ApplicationForm.update(
      { hstatus: -1 },

      {
        where: { ap_id: id },
      },
    );

    res.json({
      message: "Rejected",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};

/* APPROVE ALL */
const approveAllApplications = async (req, res) => {
  try {
    await ApplicationForm.update(
      { hstatus: 1 },

      {
        where: {
          hstatus: 0,
        },
      },
    );

    res.json({
      message: "All Approved",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};

/* REJECT ALL */
const rejectAllApplications = async (req, res) => {
  try {
    await ApplicationForm.update(
      { hstatus: -1 },

      {
        where: {
          hstatus: 0,
        },
      },
    );

    res.json({
      message: "All Rejected",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};

/* OFFICE VIEW */
const getOfficeApplications = async (req, res) => {
  try {
    const applications = await ApplicationForm.findAll({
      where: {
        hstatus: 1,
        osstatus: 0,
      },

      include: [
        {
          model: Student,
          as: "student",
          attributes: ["studentId", "studentName", "regNo", "branch"],
        },
      ],
    });

    res.json(applications);
  } catch (err) {
    console.error(err);

    res.status(500).json("Error fetching office applications");
  }
};

/* OFFICE APPROVE */
const officeApprove = async (req, res) => {
  try {
    const { id } = req.params;

    await ApplicationForm.update(
      { osstatus: 1 },

      {
        where: { ap_id: id },
      },
    );

    res.json({
      message: "Office Approved",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};

/* OFFICE REJECT */
const officeReject = async (req, res) => {
  try {
    const { id } = req.params;

    await ApplicationForm.update(
      { osstatus: -1 },

      {
        where: { ap_id: id },
      },
    );

    res.json({
      message: "Office Rejected",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json("Error");
  }
};
/* READY TO GENERATE */

const getGenerateApplications = async (req, res) => {
  try {
    const applications = await ApplicationForm.findAll({
      where: {
        hstatus: 1,
        osstatus: 1,
      },

      include: [
        {
          model: Student,
          as: "student",
          attributes: ["studentId", "studentName", "regNo", "branch"],
        },
      ],
    });

    res.json(applications);
  } catch (err) {
    console.log(err);

    res.status(500).json("Error");
  }
};

module.exports = {
  getStudentByRegNo,
  createBonafide,

  getHodApplications,
  approveApplication,
  rejectApplication,
  approveAllApplications,
  rejectAllApplications,

  getOfficeApplications,
  officeApprove,
  officeReject,

  getGenerateApplications,
};
