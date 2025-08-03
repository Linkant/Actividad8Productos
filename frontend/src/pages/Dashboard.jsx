import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        if (!token) throw new Error("No hay token, por favor inicia sesión");

        const response = await getProducts(token);

        setProducts(response.data);

        let stock = 0;
        let value = 0;
        response.data.forEach((p) => {
          stock += p.cantidad;
          value += p.cantidad * p.precio;
        });

        setTotalStock(stock);
        setTotalValue(value);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError(err.message || "Error al cargar productos");
        setProducts([]);
        setTotalStock(0);
        setTotalValue(0);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Loading spinner"
        >
          <span className="visually-hidden">Cargando productos...</span>
        </div>
      </div>
    );

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center fw-bold">Dashboard</h1>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {!error && (
        <>
          <div className="row mb-5 text-center">
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-secondary">Total productos</h5>
                  <p className="card-text display-6 fw-bold">
                    {products.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-secondary">Total stock</h5>
                  <p className="card-text display-6 fw-bold">{totalStock}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    Valor total inventario
                  </h5>
                  <p className="card-text display-6 fw-bold">
                    ${totalValue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mb-3 text-center fw-semibold">
            Últimos productos agregados
          </h2>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .slice(-5)
                  .reverse()
                  .map((p) => (
                    <tr key={p._id}>
                      <td>{p.nombre}</td>
                      <td>{p.cantidad}</td>
                      <td>${p.precio.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="d-flex justify-content-center mt-5 gap-3 flex-wrap">
        <button
          className="btn btn-primary btn-lg fw-semibold"
          onClick={() => navigate("/products")}
          aria-label="Ir a productos"
        >
          Ir a Productos
        </button>

        <button
          className="btn btn-info btn-lg fw-semibold"
          onClick={() => navigate("/history")}
          aria-label="Ver historial"
        >
          Historial
        </button>

        <button
          className="btn btn-outline-danger btn-lg fw-semibold"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
