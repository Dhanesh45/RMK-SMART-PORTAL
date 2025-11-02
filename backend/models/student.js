const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Student = sequelize.define(
  "Student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_mail: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    "Reg No": {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    branch: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    student_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "other"),
      allowNull: true,
    },
    "Dayscholar/Hosteller": {
      type: DataTypes.ENUM("dayscholar", "hosteller"),
      allowNull: true,
    },
    "Parent Name": {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    "Parent Phone Number": {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: true,
    },
    native: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    counsellor: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    "Year coordinator": {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    hod: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    section: {
      type: DataTypes.ENUM("A", "B", "C", "D", "E", "F"),
      allowNull: true,
    },
  },
  {
    tableName: "student",
    timestamps: false,
  }
);

module.exports = Student;
