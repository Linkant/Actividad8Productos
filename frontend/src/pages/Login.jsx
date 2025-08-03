import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const validateUsername = (name) => name.trim().length >= 3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(username)) {
      setError("El usuario debe tener al menos 3 caracteres");
      return;
    }
    if (password.trim() === "") {
      setError("Ingrese una contraseña");
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      setError(null);
      navigate("/dashboard");
    } else {
      setError(result.message || "Credenciales inválidas");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
      >
        <h2 className="text-center mb-4 text-secondary fw-bold">
          Iniciar Sesión
        </h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label text-secondary fw-semibold"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label text-secondary fw-semibold"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 fw-bold"
            style={{ letterSpacing: "0.05em" }}
          >
            Entrar
          </button>
        </form>

        <p className="mt-3 text-center text-secondary">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-dark fw-semibold text-decoration-underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
