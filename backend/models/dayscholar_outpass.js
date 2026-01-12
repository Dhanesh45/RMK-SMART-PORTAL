const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Student = require("./student");
const Faculty = require("./faculty");

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
    facultyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Faculty,
        key: "f_id",
      },
      field: "Faculty id",
    },
     studentName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "Student name",
    },
    regNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: "Register number",
    },
    year: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    branch: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
  type: DataTypes.ENUM("Yes", "No"), // This ONLY accepts "Yes" or "No"
  allowNull: true,
  field: "Parent Permission",
},
    parentNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: "Parent number",
    },
   
    fromDate: {
      type: DataTypes.DATE,
      field: "From Date",
    },
    toDate: {
      type: DataTypes.DATE,
      field: "To Date",
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "remarks",
    },
    
    dateOfApplication: {
      type: DataTypes.DATE,
      field: "Date of application",
    },
    
    leavingTime: {
      type: DataTypes.TIME,
      field: "Leaving Time",
    },
    
    cstatus: DataTypes.INTEGER,
    ystatus: DataTypes.INTEGER,
    hstatus: DataTypes.INTEGER,
  },
  {
    tableName: "dayscholars_outpass",
    timestamps: false,
  }
);

// Associations
Student.hasMany(DayscholarsOutpass, { foreignKey: "studentId" });
DayscholarsOutpass.belongsTo(Student, { foreignKey: "studentId" });

Faculty.hasMany(DayscholarsOutpass, { foreignKey: "facultyId" });
DayscholarsOutpass.belongsTo(Faculty, { foreignKey: "facultyId" });

module.exports = DayscholarsOutpass;
