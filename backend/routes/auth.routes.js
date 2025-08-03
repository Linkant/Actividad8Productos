const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect, admin } = require("../middlewares/authMiddleware");

const JWT_SECRET = process.env.JWT_SECRET;

// Ruta para obtener info del usuario actual
router.get("/me", protect, async (req, res) => {
  // protect agrega req.user
  if (!req.user) {
    return res.status(401).json({ error: "No autorizado" });
  }

  res.json({
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
    id: req.user._id,
  });
});

// Ruta para registro
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Usuario ya existe" });

    // Forzamos que el rol siempre sea "user"
    user = new User({ username, email, password, role: "user" });
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para login
router.post("/login", async (req, res) => {
  console.log("Body recibido:", req.body); // <--- aquí
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en login" });
  }
});

// Obtener todos los usuarios (solo admin)
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un usuario por ID (solo admin)
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
