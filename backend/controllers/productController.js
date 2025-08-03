const Producto = require("../models/producto");
const History = require("../models/History"); // <-- importa el modelo historial

async function guardarHistorial(usuarioId, accion, detalle) {
  try {
    await History.create({ usuario: usuarioId, accion, detalle });
  } catch (error) {
    console.error("Error guardando historial:", error);
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { nombre, cantidad, precio } = req.body;
    const nuevoProducto = new Producto({ nombre, cantidad, precio });
    await nuevoProducto.save();

    await guardarHistorial(
      req.user._id,
      "Crear producto",
      `Producto creado: ${nuevoProducto.nombre}`
    );

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { nombre, cantidad, precio } = req.body;
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, cantidad, precio },
      { new: true }
    );
    if (!productoActualizado)
      return res.status(404).json({ error: "Producto no encontrado" });

    await guardarHistorial(
      req.user._id,
      "Editar producto",
      `Producto editado: ${productoActualizado.nombre}`
    );

    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado)
      return res.status(404).json({ error: "Producto no encontrado" });

    await guardarHistorial(
      req.user._id,
      "Eliminar producto",
      `Producto eliminado ID: ${req.params.id}`
    );

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

// 👇 ESTAS FUNCIONES VAN AFUERA de deleteProduct 👇

exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto por ID" });
  }
};
