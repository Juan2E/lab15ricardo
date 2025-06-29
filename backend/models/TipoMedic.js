// models/TipoMedic.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TipoMedic = sequelize.define('TipoMedic', {
  CodTipoMed: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'TipoMedic',
  timestamps: false
});

module.exports = TipoMedic;
