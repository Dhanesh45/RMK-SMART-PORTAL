const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");
const Outpass = require("./outpass");

const ODForm = sequelize.define(
  "OD_Form",
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
    outpass_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Outpass,
        key: "Outpass id",
      },
    },
    "Purpose of od": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "Number of days": {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    "From date": {
      type: DataTypes.DATE,
      allowNull: true,
    },
    "To date": {
      type: DataTypes.DATE,
      allowNull: true,
    },
    place: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    "College name": {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    "Event name": {
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
    tableName: "od_form",
    timestamps: false,
  }
);

// Associations
Student.hasMany(ODForm, { foreignKey: "student_id" });
ODForm.belongsTo(Student, { foreignKey: "student_id" });

Outpass.hasOne(ODForm, { foreignKey: "outpass_id" });
ODForm.belongsTo(Outpass, { foreignKey: "outpass_id" });

module.exports = ODForm;
