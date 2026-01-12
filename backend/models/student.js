// models/student.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Student = sequelize.define(
  "student",
  {
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "student_id",
    },
    studentMail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "student_mail",
      unique: "unique_student_mail", // named unique key
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    regNo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "reg_no",
      unique: "unique_reg_no", // avoid recreating anonymous unique indexes
    },
    year: {
      type: DataTypes.STRING(100),
    },
    branch: {
      type: DataTypes.STRING(100),
    },
    studentName: {
      type: DataTypes.STRING(100),
      field: "student_name",
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
    },
    accommodation: {
      type: DataTypes.ENUM("Dayscholar", "Hosteller"),
      field: "accommodation",
    },
    parentName: {
      type: DataTypes.STRING(100),
      field: "parent_name",
    },
    parentPhone: {
      type: DataTypes.STRING(15),
      field: "parent_phone",
    },
    native: {
      type: DataTypes.STRING(100),
    },
   counsellor: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: 'faculty',
    key: 'f_id',
  },
},

    yearCoordinator: {
      type: DataTypes.STRING(100),
      field: "year_coordinator",
    },
    hod: {
      type: DataTypes.STRING(100),
    },
    section: {
      type: DataTypes.ENUM("A", "B", "C", "D", "E", "F"),
    },
  },
  {
    tableName: "student",
    timestamps: false,
  }
);


module.exports = Student;