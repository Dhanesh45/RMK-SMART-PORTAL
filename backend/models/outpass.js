// models/outpass.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");
const Faculty = require("./faculty");

const Outpass = sequelize.define(
  "Outpass",
  {
    outpassId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Outpass id",
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Student,
        key: "student_id",
      },
      field: "Student id",
    },
    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Faculty,
        key: "f_id",
      },
      field: "Faculty id",
    },

    // ✅ Extra student info (auto-filled)
    studentName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Student name",
    },
    regNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "Register number",
    },
    year: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    branch: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    parentName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Parent name",
    },
    parentPhone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: "Parent phone",
    },

    dateOfApplication: {
      type: DataTypes.DATE,
      field: "Date of application",
    },
    roomNumber: {
      type: DataTypes.INTEGER,
      field: "Room number",
    },
    noOfDays: {
      type: DataTypes.STRING(10),
      field: "No. of. Days",
    },
    fromDate: {
      type: DataTypes.DATE,
      field: "From Date",
    },
    toDate: {
      type: DataTypes.DATE,
      field: "To Date",
    },
    reasonForLeave: {
      type: DataTypes.STRING(200),
      field: "Reason for leave",
    },
    parentsPermission: {
      type: DataTypes.ENUM("Yes", "No"),
      field: "Parents permission",
    },
    remarks: {
      type: DataTypes.STRING(255),
    },
    leavingDate: {
      type: DataTypes.DATE,
      field: "Leaving Date",
    },
    leavingTime: {
      type: DataTypes.TIME,
      field: "Leaving Time",
    },
    forOd: {
      type: DataTypes.ENUM("Yes", "No"),
      field: "For od",
    },
    cstatus: DataTypes.INTEGER,
    ystatus: DataTypes.INTEGER,
    hstatus: DataTypes.INTEGER,
  },
  {
    tableName: "outpass",
    timestamps: false,
  }
);

// ✅ Associations
Student.hasMany(Outpass, { foreignKey: "studentId" });
Outpass.belongsTo(Student, { foreignKey: "studentId" });

Faculty.hasMany(Outpass, { foreignKey: "facultyId" });
Outpass.belongsTo(Faculty, { foreignKey: "facultyId" });

module.exports = Outpass;
