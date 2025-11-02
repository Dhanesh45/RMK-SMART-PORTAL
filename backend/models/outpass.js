const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");
const Faculty = require("./faculty");

const Outpass = sequelize.define(
  "Outpass",
  {
    "Outpass id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    "Student id": {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Student,
        key: "student_id",
      },
    },
    "Faculty id": {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Faculty,
        key: "f_id",
      },
    },
    "Date of application": {
      type: DataTypes.DATE,
      allowNull: true,
    },
    "Room number": {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    "No. of. Days": {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    "From Date": {
      type: DataTypes.DATE,
      allowNull: true,
    },
    "To Date": {
      type: DataTypes.DATE,
      allowNull: true,
    },
    "Reason for leave": {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    "Parents permission": {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    "Leaving Date": {
      type: DataTypes.DATE,
      allowNull: true,
    },
    "Leaving Time": {
      type: DataTypes.TIME,
      allowNull: true,
    },
    "For od": {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
    },
    cstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ystatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "outpass",
    timestamps: false,
  }
);

// Associations
Student.hasMany(Outpass, { foreignKey: "Student id" });
Outpass.belongsTo(Student, { foreignKey: "Student id" });

Faculty.hasMany(Outpass, { foreignKey: "Faculty id" });
Outpass.belongsTo(Faculty, { foreignKey: "Faculty id" });

module.exports = Outpass;
