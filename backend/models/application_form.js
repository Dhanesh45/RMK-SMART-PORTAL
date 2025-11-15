const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");

const ApplicationForm = sequelize.define(
  "application_form",
  {
    ap_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ap_id",
    },
    sid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "student_id",
      },
      field: "sid",
    },
    fatherName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    age:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    boarding: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    houseno: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fees_detail_year: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    type_of_application: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    hstatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // 0=pending
    },
    osstatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // 0=pending
    },
    applied_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "application_form",
    timestamps: false,
  }
);

// Associations
Student.hasMany(ApplicationForm, { foreignKey: "sid" });
ApplicationForm.belongsTo(Student, { foreignKey: "sid" });

module.exports = ApplicationForm;
