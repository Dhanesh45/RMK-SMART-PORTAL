const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");

const DayscholarsOutpass = sequelize.define(
  "DayscholarsOutpass",
  {
    dayscholaroutpassId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "dayscholaroutpass_id",
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "Student id",
      references: {
        model: Student,
        key: "student_id",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "date",
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
      field: "time",
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Purpose of Leaving",
    },
    parentName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Parent name",
    },
    parentPermission: {
      type: DataTypes.ENUM("Yes", "No"),
      allowNull: true,
      field: "Parent Permission",
    },
    parentNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: "Parent number",
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "remarks",
    },
  },
  {
    tableName: "dayscholars_outpass",
    timestamps: false,
  }
);

// Associations
Student.hasMany(DayscholarsOutpass, { foreignKey: "studentId" });
DayscholarsOutpass.belongsTo(Student, { foreignKey: "studentId" });

module.exports = DayscholarsOutpass;
