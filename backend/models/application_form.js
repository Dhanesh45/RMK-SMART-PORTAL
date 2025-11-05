// models/application_form.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");

const ApplicationForm = sequelize.define("ApplicationForm", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reason: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.STRING,
  },
  fatherName: {
    type: DataTypes.STRING,
  },
  section: {
    type: DataTypes.STRING,
  },
  houseNo: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  street: {
    type: DataTypes.STRING,
  },
  area: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  boardingPlace: {
    type: DataTypes.STRING,
  },
  bonafideType: {
    type: DataTypes.STRING,
  },
});

// Relationship: ApplicationForm belongs to Student
ApplicationForm.belongsTo(Student, {
  foreignKey: "studentId",
  onDelete: "CASCADE",
});

module.exports = ApplicationForm;
