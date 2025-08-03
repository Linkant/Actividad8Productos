import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const navigate = useNavigate();

  const isValidUsername = (name) => /^[a-zA-Z0-9_]{3,15}$/.test(name);
  const isValidEmail = (mail) => /\S+@\S+\.\S+/.test(mail);
  const isValidPassword = (pass) =>
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!isValidUsername(username)) {
      setError(
        "El usuario debe tener entre 3 y 15 caracteres, solo letras, números o _"
      );
      return;
    }
    if (!isValidEmail(email)) {
      setError("Correo inválido");
      return;
    }
    if (!isValidPassword(password)) {
      setError(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número"
      );
      return;
    }

    try {
      await registerUser({ username, email, password });
      setSuccessMsg("Registro exitoso! Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch {
      setError("Error en el registro");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
      >
        <h2 className="text-center mb-4 text-secondary fw-bold">Registro</h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success text-center" role="alert">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label text-secondary fw-semibold"
            >
              Nombre de usuario
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

          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label text-secondary fw-semibold"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
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
            <small className="form-text text-muted mt-1">
              La contraseña debe tener al menos:
              <br />
              • 6 caracteres
              <br />
              • 1 letra mayúscula
              <br />• 1 número
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 fw-bold"
            style={{ letterSpacing: "0.05em" }}
          >
            Registrarse
          </button>
        </form>

        <p className="mt-3 text-center text-secondary">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-dark fw-semibold text-decoration-underline"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
