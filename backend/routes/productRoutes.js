const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect, admin } = require("../middlewares/authMiddleware"); // Importa los middlewares

// Listar productos - público
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Crear producto - usuario autenticado (admin o user)
router.post("/", protect, productController.createProduct);

// Editar producto - solo admin
router.put("/:id", protect, admin, productController.updateProduct);

// Eliminar producto - solo admin
router.delete("/:id", protect, admin, productController.deleteProduct);

module.exports = router;
