const { Sequelize } = require('sequelize');  // corregido 'sequelize'

const sequelize = new Sequelize('libros', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
