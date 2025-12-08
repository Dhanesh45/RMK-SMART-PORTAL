const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Faculty = sequelize.define(
  "Faculty",
  {
    f_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mail: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    faculty_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    faculty_branch: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "faculty",
    timestamps: false,
  }
);

module.exports = Faculty;
