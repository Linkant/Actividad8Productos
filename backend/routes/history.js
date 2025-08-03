const express = require("express");
const router = express.Router();
const History = require("../models/History");
const { protect, admin } = require("../middlewares/authMiddleware");

// Solo admin puede ver historial
router.get("/", protect, admin, async (req, res) => {
  try {
    const historial = await History.find()
      .populate("usuario", "username email")
      .sort({ fecha: -1 })
      .limit(100);
    res.json(historial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener historial" });
  }
});

module.exports = router;
