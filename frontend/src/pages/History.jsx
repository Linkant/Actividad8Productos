import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function History() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchHistory();
  }, [token]);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("http://localhost:5000/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar historial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
      <div className="card shadow-sm rounded border-0">
        <div className="card-body p-4">
          <h1 className="card-title mb-4 text-center text-primary fw-bold">
            Historial de Movimientos
          </h1>

          {loading && (
            <div className="text-center my-5">
              <div
                className="spinner-border text-primary"
                role="status"
                aria-label="Cargando historial"
              >
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-secondary fs-5">Cargando historial...</p>
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger text-center py-3 fw-semibold"
              role="alert"
            >
              {error}
            </div>
          )}

          {!loading && !error && history.length === 0 && (
            <div className="alert alert-info text-center py-3">
              No hay movimientos registrados.
            </div>
          )}

          {!loading && !error && history.length > 0 && (
            <div
              className="table-responsive rounded"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <table className="table table-hover align-middle mb-0">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th style={{ minWidth: "180px" }}>Fecha</th>
                    <th style={{ minWidth: "150px" }}>Usuario</th>
                    <th style={{ minWidth: "130px" }}>Acción</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(
                    ({ _id, usuario, accion, detalle, createdAt }) => (
                      <tr key={_id} className="align-middle">
                        <td>{new Date(createdAt).toLocaleString()}</td>
                        <td>{usuario?.nombre || "Desconocido"}</td>
                        <td className="text-capitalize">{accion}</td>
                        <td
                          className="text-break"
                          style={{ maxWidth: "300px" }}
                        >
                          {detalle || "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary btn-lg px-5 fw-semibold"
              onClick={() => navigate("/dashboard")}
              aria-label="Volver al dashboard"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
