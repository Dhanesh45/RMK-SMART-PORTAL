const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Student = sequelize.define("student", {
  student_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  student_mail: {
  type: DataTypes.STRING,
}
,
  password: DataTypes.STRING,
  reg_no: DataTypes.STRING,
  year: DataTypes.STRING,
  branch: DataTypes.STRING,
  student_name: DataTypes.STRING,
  gender: DataTypes.STRING,
  accommodation: DataTypes.STRING,
  parent_name: DataTypes.STRING,
  parent_phone: DataTypes.STRING,
  native: DataTypes.STRING,
  counsellor: DataTypes.STRING,
  year_coordinator: DataTypes.STRING,
  hod: DataTypes.STRING,
  section: DataTypes.STRING,
});

module.exports = Student;
