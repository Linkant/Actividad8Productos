// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Importar rutas
const productRoutes = require("./routes/productRoutes");

const historyRoutes = require("./routes/history");
const authRoutes = require("./routes/auth.routes"); // Autenticación

// Cargar variables de entorno desde .env
dotenv.config();

// Crear app
const app = express();

// Middleware

app.use(express.json());
app.use(cors());
app.use("/api/history", historyRoutes);
// Rutas API
app.use("/api/products", productRoutes);
app.use("/api/auth", require("./routes/auth.routes"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("✅ API funcionando correctamente");
});

// Ruta para obtener todos los productos (prueba directa)
const Producto = require("./models/producto");
app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Conectar a MongoDB y levantar servidor
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Servidor corriendo en http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });
