const Medicamento = require('../models/Medicamento');
const TipoMedic = require('../models/TipoMedic');

// Obtener todos los medicamentos con su tipo
exports.getAll = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      include: { model: TipoMedic }
    });
    res.json(medicamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un medicamento por su código con su tipo
exports.getOne = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.CodMedicamento, {
      include: { model: TipoMedic }
    });
    if (!medicamento) return res.status(404).json({ message: 'No encontrado' });
    res.json(medicamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo medicamento
exports.create = async (req, res) => {
  try {
    const nuevoMedicamento = await Medicamento.create(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un medicamento
exports.update = async (req, res) => {
  try {
    const [actualizado] = await Medicamento.update(req.body, {
      where: { CodMedicamento: req.params.CodMedicamento }
    });

    if (actualizado === 0) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un medicamento
exports.remove = async (req, res) => {
  try {
    const eliminado = await Medicamento.destroy({
      where: { CodMedicamento: req.params.CodMedicamento }
    });

    if (!eliminado) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
