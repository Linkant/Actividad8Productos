const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(400).json({ message: "Usuario o email ya existe" });

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};