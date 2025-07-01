const Autor = require('../models/Autor');
const Libro = require('../models/Libro');

// Obtener todos los autores con sus libros
exports.getAll = async (req, res) => {
  try {
    const autores = await Autor.findAll({
      include: { model: Libro }
    });
    res.json(autores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un autor por su ID con sus libros
exports.getOne = async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.AutorID, {
      include: { model: Libro }
    });
    if (!autor) return res.status(404).json({ message: 'No encontrado' });
    res.json(autor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo autor
exports.create = async (req, res) => {
  try {
    const nuevoAutor = await Autor.create(req.body);
    res.status(201).json(nuevoAutor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un autor
exports.update = async (req, res) => {
  try {
    const [actualizado] = await Autor.update(req.body, {
      where: { AutorID: req.params.AutorID }
    });

    if (actualizado === 0) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un autor
exports.remove = async (req, res) => {
  try {
    const eliminado = await Autor.destroy({
      where: { AutorID: req.params.AutorID }
    });

    if (!eliminado) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
