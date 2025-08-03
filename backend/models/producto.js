const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
});

// Esto evita el error OverwriteModelError
module.exports =
  mongoose.models.Producto || mongoose.model("Producto", productoSchema);
