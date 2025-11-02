const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const OfficeStaff = sequelize.define(
  "OfficeStaff",
  {
    os_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "office_staff",
    timestamps: false,
  }
);

module.exports = OfficeStaff;
