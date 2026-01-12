const sequelize = require('../db');
const Student = require('./student');
const Faculty = require('./faculty');

// Associations
Faculty.hasMany(Student, { foreignKey: 'counsellor' });
Student.belongsTo(Faculty, { foreignKey: 'counsellor' });

module.exports = { sequelize, Student, Faculty };
