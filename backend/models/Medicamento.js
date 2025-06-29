// models/Medicamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const TipoMedic = require('./TipoMedic');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  fechaFabricacion: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fechaVencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  CodTipoMed: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: TipoMedic,
      key: 'CodTipoMed'
    }
  }
}, {
  tableName: 'Medicamento',
  timestamps: false
});

// Definir relación: Medicamento pertenece a TipoMedic
Medicamento.belongsTo(TipoMedic, { foreignKey: 'CodTipoMed' });
TipoMedic.hasMany(Medicamento, { foreignKey: 'CodTipoMed' });

module.exports = Medicamento;
