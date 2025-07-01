const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Autor = sequelize.define('Autor', {
  AutorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Nacionalidad: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'Autores',
  timestamps: false
});

module.exports = Autor;
