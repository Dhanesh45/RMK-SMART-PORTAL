const sequelize = require("../db");

const Student = require("./student");
const Faculty = require("./faculty");
const ApplicationForm = require("./application_form");

/* CREATE DB OBJECT */

const db = {};

db.sequelize = sequelize;

db.Student = Student;
db.Faculty = Faculty;
db.ApplicationForm = ApplicationForm;

/* ASSOCIATIONS */

/* Faculty → Student */
Faculty.hasMany(Student,{
foreignKey:"counsellor"
});

Student.belongsTo(Faculty,{
foreignKey:"counsellor"
});

/* Student → Bonafide */
Student.hasMany(ApplicationForm,{
foreignKey:"sid"
});

ApplicationForm.belongsTo(Student,{
foreignKey:"sid",
as:"student"
});

module.exports = db;