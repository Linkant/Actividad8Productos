import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProductById, updateProduct } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      const { nombre, cantidad, precio } = res.data;
      setNombre(nombre);
      setCantidad(cantidad);
      setPrecio(precio);
    } catch {
      setError("Error al cargar producto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nombre || !cantidad || !precio) {
      setError("Por favor completa todos los campos");
      return;
    }

    const productData = {
      nombre,
      cantidad: Number(cantidad),
      precio: Number(precio),
    };

    try {
      if (id) {
        await updateProduct(id, productData, token);
        setSuccess("Producto actualizado exitosamente");
      } else {
        await createProduct(productData, token);
        setSuccess("Producto creado exitosamente");
        // Limpiar campos solo al crear nuevo producto
        setNombre("");
        setCantidad("");
        setPrecio("");
      }
    } catch {
      setError("Error al guardar producto");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "480px" }}>
      <div className="card shadow-sm rounded">
        <div className="card-body p-4">
          <h1 className="card-title mb-4 text-center">
            {id ? "Editar producto" : "Nuevo producto"}
          </h1>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success text-center" role="alert">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
                className="form-control"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min="0"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                id="precio"
                className="form-control"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                min="0"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold">
              Guardar
            </button>
          </form>

          {/* Botón Salir, siempre visible, centrado, con margen arriba */}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/products")}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
