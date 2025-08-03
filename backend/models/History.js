const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accion: { type: String, required: true },
  detalle: { type: String },
  fecha: { type: Date, default: Date.now },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
