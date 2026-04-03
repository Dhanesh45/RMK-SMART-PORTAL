const db = require("../models");

const ApplicationForm = db.ApplicationForm;
const nodemailer = require("nodemailer"); 
const Student = db.Student;
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
    const {
      regNo,
      reason,
      semester,
      fatherName,
      houseno,
      age,
      street,
      area,
      city,
      state,
      pincode,
      date_of_birth,
      fees_detail_year,
      boarding,
      category,
      type_of_application,
    } = req.body;

    /* FIND STUDENT */
    const student = await Student.findOne({
      where: { regNo },
    });

    console.log("REQ BODY:", req.body);

    console.log("STUDENT:", student);

    console.log("SID:", student?.studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    /* CREATE APPLICATION */
    await ApplicationForm.create({
      sid: student.studentId,

      reason,
      semester,
      fatherName,
      houseno,
      age,
      street,
      area,
      city,
      state,
      pincode,
      date_of_birth,
      fees_detail_year,
      boarding,
      category,
      type_of_application,

      hstatus: 0,
      osstatus: 0,
    });
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
      { hstatus: 1 ,
        hod_approved_date: new Date()
      },

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

const sendMailToStudent = async (req, res) => {
  try {
    const { ap_id } = req.body;

    const application = await ApplicationForm.findOne({
      where: { ap_id },
      include: [{ model: Student, as: "student" ,
      attributes: ["studentId", "student_name", "student_mail","reg_no"]
      }],
    });


    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

const studentEmail = application.student.dataValues.student_mail;

console.log("EMAIL:", studentEmail);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rmksmartportal@gmail.com",
    pass: "ymhn fuxp amac ifhg" 
  }
});

if (!studentEmail) {
  return res.status(400).json({ message: "Email missing" });
}

await transporter.sendMail({
  from: "rmksmartportal@gmail.com",
  to: studentEmail,
  subject: "Bonafide Certificate Generated",
  text: `Hello ${application.student.dataValues.student_name},

Your certificate is ready.

Regards,
Office Staff`
});

await ApplicationForm.update(
  { osstatus: 2 ,
     generated_date: new Date()
  },
  { where: { ap_id } }
);

    res.json({ message: "Mail sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending mail" });
  }
};

const getOsHistory = async (req, res) => {
  try {
    const applications = await ApplicationForm.findAll({
      where: {
        osstatus: 2,
      },
      include: [
        {
          model: Student,
          as: "student",
          attributes: [
            "studentId",
            "student_name",
            "reg_no",
            "branch",
            "year",
          ],
        },
      ],
    });

    console.log("HISTORY DATA:", applications); // ✅ DEBUG
    console.log("FULL RESPONSE:", res);
console.log("DATA:", res.data);
console.log("TYPE:", typeof res.data);

    return res.json(applications ?? []);
  } catch (err) {
    console.error("HISTORY ERROR:", err); // 🔥 VERY IMPORTANT
    return res.json([]); // NEVER send null
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
  sendMailToStudent,
   getOsHistory,

  getGenerateApplications,
};
