const express = require('express');
const cors = require('cors');

const tipoMedicRoutes = require('./routes/tipoMedicRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');

const sequelize = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tipomedic', tipoMedicRoutes);
app.use('/api/medicamento', medicamentoRoutes);

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(3001, () => {
      console.log('Backend corriendo en http://localhost:3001');
    });
  })
  .catch(err => {
    console.error("Error al sincronizar base de datos:", err);
  });
