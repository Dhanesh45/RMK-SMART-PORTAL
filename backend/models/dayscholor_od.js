const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");
const Outpass = require("./outpass");


const DayscholarOD = sequelize.define(
  "dayscholor_od",
  {
    od_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Student,
        key: "student_id",
      },
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    place: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    collegeName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    eventName: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    proof: {
      type: DataTypes.BLOB("long"),
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
    tableName: "dayscholar_od",
    timestamps: false,
  }
);

// Associations
Student.hasMany(DayscholarOD, { foreignKey: "student_id" });
DayscholarOD.belongsTo(Student, { foreignKey: "student_id" });



module.exports = DayscholarOD;
