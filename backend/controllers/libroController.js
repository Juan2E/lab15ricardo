const Libro = require('../models/Libro');
const Autor = require('../models/Autor');

// Obtener todos los libros con su autor
exports.getAll = async (req, res) => {
  try {
    const libros = await Libro.findAll({
      include: { model: Autor }
    });
    res.json(libros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un libro por su ID con su autor
exports.getOne = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.LibroID, {
      include: { model: Autor }
    });
    if (!libro) return res.status(404).json({ message: 'No encontrado' });
    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo libro
exports.create = async (req, res) => {
  try {
    const nuevoLibro = await Libro.create(req.body);
    res.status(201).json(nuevoLibro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un libro
exports.update = async (req, res) => {
  try {
    const [actualizado] = await Libro.update(req.body, {
      where: { LibroID: req.params.LibroID }
    });

    if (actualizado === 0) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un libro
exports.remove = async (req, res) => {
  try {
    const eliminado = await Libro.destroy({
      where: { LibroID: req.params.LibroID }
    });

    if (!eliminado) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
