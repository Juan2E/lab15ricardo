const Producto = require('../models/producto');

// Obtener todos los productos
exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un solo producto por su código
exports.getOne = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.codProducto);
    if (!producto) return res.status(404).json({ message: 'No encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto
exports.create = async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto
exports.update = async (req, res) => {
  try {
    const [actualizado] = await Producto.update(req.body, {
      where: { codProducto: req.params.codProducto }
    });

    if (actualizado === 0) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un producto
exports.remove = async (req, res) => {
  try {
    const eliminado = await Producto.destroy({
      where: { codProducto: req.params.codProducto }
    });

    if (!eliminado) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
