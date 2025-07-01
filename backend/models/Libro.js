const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Autor = require('./Autor');

const Libro = sequelize.define('Libro', {
  LibroID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  AñoPublicacion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  AutorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Autor,
      key: 'AutorID'
    }
  }
}, {
  tableName: 'Libros',
  timestamps: false
});

// Definir relación: Libro pertenece a Autor
Libro.belongsTo(Autor, { foreignKey: 'AutorID' });
Autor.hasMany(Libro, { foreignKey: 'AutorID' });

module.exports = Libro;
