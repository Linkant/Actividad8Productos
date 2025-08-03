// src/components/RequireAuth.jsx
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
