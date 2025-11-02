const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");

const DayscholarsOutpass = sequelize.define(
  "Dayscholars_Outpass",
  {
    dayscholaroutpass_id: {
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
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    "Purpose of Leaving": {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    "Parent name": {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    "Parent Permission": {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
    },
    "Parent number": {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "dayscholars_outpass",
    timestamps: false,
  }
);

// Association
Student.hasMany(DayscholarsOutpass, { foreignKey: "Student id" });
DayscholarsOutpass.belongsTo(Student, { foreignKey: "Student id" });

module.exports = DayscholarsOutpass;
