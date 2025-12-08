const sequelize = require("../db");
const Outpass = require("../models/outpass");
const ODForm = require("../models/od_form");
const Student = require("../models/student");

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

    const createdOutpass = await Outpass.create(
      {
        studentId: student.studentId,
        studentName: student.studentName,
        year: student.year,
        branch: student.branch,
        parentName: student.parentName,
        parentPhone: student.parentPhone,
        dateOfApplication: new Date(),
        forOd: true,
        ...outpass,
      },
      { transaction }
    );

    await ODForm.create(
      {
        student_id: student.studentId,
        outpass_id: createdOutpass.outpassId,
        purpose: od.purpose,
        numberOfDays: od.numberOfDays,
        fromDate: od.fromDate,
        toDate: od.toDate,
        place: od.place,
        collegeName: od.collegeName,
        eventName: od.eventName,
        date:od.date
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

module.exports = { createODWithOutpass };
