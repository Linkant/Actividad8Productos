const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware para proteger rutas con autenticación
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("Usuario autenticado:", req.user);

      if (!req.user) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      return next(); // importante el return aquí
    } catch (error) {
      console.error("Error en protect middleware:", error);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  } else {
    return res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

// Middleware para verificar si el usuario es admin
const admin = (req, res, next) => {
  console.log("Usuario en admin middleware", req.user);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado: solo admins" });
  }
};

module.exports = { protect, admin };
