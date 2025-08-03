import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const { user, token } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    if (!user || (user.role !== "admin" && user.role !== "user")) {
      navigate("/dashboard");
    } else {
      fetchProducts();
    }
  }, [user, token]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(token);
      setProducts(response.data);
      setError(null);
      setPermissionError(null);
    } catch (err) {
      setError("Error al cargar productos");
    }
  };

  // Validar permiso para agregar producto
  const handleAddClick = () => {
    if (user.role !== "admin") {
      setPermissionError("No tienes autorización para realizar esta acción.");
      return;
    }
    navigate("/products/new");
  };

  // Validar permiso para editar producto
  const handleEditClick = (id) => {
    if (user.role !== "admin") {
      setPermissionError("No tienes autorización para realizar esta acción.");
      return;
    }
    navigate(`/products/edit/${id}`);
  };

  // Validar permiso para mostrar modal eliminar
  const confirmDelete = (id) => {
    if (user.role !== "admin") {
      setPermissionError("No tienes autorización para realizar esta acción.");
      return;
    }
    setProductToDelete(id);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const cancelDelete = () => {
    setShowModal(false);
    setProductToDelete(null);
    document.body.style.overflow = "auto";
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete, token);
      fetchProducts();
      cancelDelete();
    } catch (err) {
      alert("Error al eliminar");
      cancelDelete();
    }
  };

  return (
    <div className={`container my-5 ${showModal ? "position-relative" : ""}`}>
      <h1 className="mb-4 text-center fw-bold">Productos</h1>

      {/* Error general */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Error por permiso */}
      {permissionError && (
        <div className="alert alert-warning text-center" role="alert">
          {permissionError}
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Cerrar"
            onClick={() => setPermissionError(null)}
          ></button>
        </div>
      )}

      <div className="mb-4 text-center">
        <button
          onClick={handleAddClick}
          className="btn btn-success btn-lg fw-semibold"
        >
          + Agregar producto
        </button>
      </div>

      <div
        className={`table-responsive shadow-sm rounded ${
          showModal ? "opacity-50" : ""
        }`}
      >
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(({ _id, nombre, cantidad, precio }) => (
                <tr key={_id}>
                  <td>{nombre}</td>
                  <td>{cantidad}</td>
                  <td>${precio.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(_id)}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => confirmDelete(_id)}
                      className="btn btn-sm btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No hay productos aún
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-secondary btn-lg"
        >
          Volver al Dashboard
        </button>
      </div>

      {/* Modal eliminar */}
      {showModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1050 }}
            onClick={cancelDelete}
          ></div>

          <div
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow p-4"
            style={{ zIndex: 1060, maxWidth: "360px", width: "90%" }}
          >
            <h5 className="mb-3 text-center">Confirmar eliminación</h5>
            <p className="text-center">
              ¿Estás seguro que querés eliminar este producto?
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-danger" onClick={handleDelete}>
                Sí, eliminar
              </button>
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
