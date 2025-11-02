const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");

const ApplicationForm = sequelize.define(
  "Application_Form",
  {
    ap_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Student,
        key: "student_id",
      },
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
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    fees_detail_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type_of_application: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    hstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    osstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "application_form",
    timestamps: false,
  }
);

// Association
Student.hasMany(ApplicationForm, { foreignKey: "sid" });
ApplicationForm.belongsTo(Student, { foreignKey: "sid" });

module.exports = ApplicationForm;
