import { Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import History from "./pages/History.jsx";
import Unauthorized from "./pages/Unauthorized"; // Asegúrate de tener esta página

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Rutas protegidas solo para usuarios autenticados */}
      <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/history" element={<History />} />{" "}
        {/* <-- RUTA AGREGADA */}
      </Route>

      {/* Rutas protegidas solo para admin */}
      <Route element={<RequireAuth allowedRoles={["admin"]} />}>
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
