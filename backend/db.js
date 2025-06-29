const { Sequelize } = require('sequelize');  // corregido 'sequelize'

const sequelize = new Sequelize('juan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
