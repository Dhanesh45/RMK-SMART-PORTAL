const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");

const ApplicationForm = sequelize.define("ApplicationForm", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: "student_id",
    },
  },
  reason: DataTypes.STRING,
  fatherName: DataTypes.STRING,
  houseNo: DataTypes.STRING,
  dob: DataTypes.DATEONLY,
  age: DataTypes.INTEGER,
  street: DataTypes.STRING,
  area: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  pincode: DataTypes.STRING,
  category: DataTypes.STRING,
  boardingPlace: DataTypes.STRING,
  bonafideType: DataTypes.STRING,
});

ApplicationForm.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
});

module.exports = ApplicationForm;
