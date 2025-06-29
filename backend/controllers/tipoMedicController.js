const TipoMedic = require('../models/TipoMedic');

// Obtener todos los tipos de medicamento
exports.getAll = async (req, res) => {
  try {
    const tipos = await TipoMedic.findAll();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un tipo de medicamento por su código
exports.getOne = async (req, res) => {
  try {
    const tipo = await TipoMedic.findByPk(req.params.CodTipoMed);
    if (!tipo) return res.status(404).json({ message: 'No encontrado' });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo tipo de medicamento
exports.create = async (req, res) => {
  try {
    const nuevoTipo = await TipoMedic.create(req.body);
    res.status(201).json(nuevoTipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un tipo de medicamento
exports.update = async (req, res) => {
  try {
    const [actualizado] = await TipoMedic.update(req.body, {
      where: { CodTipoMed: req.params.CodTipoMed }
    });

    if (actualizado === 0) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un tipo de medicamento
exports.remove = async (req, res) => {
  try {
    const eliminado = await TipoMedic.destroy({
      where: { CodTipoMed: req.params.CodTipoMed }
    });

    if (!eliminado) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
