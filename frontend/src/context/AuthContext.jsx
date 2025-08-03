import React, { createContext, useContext, useState, useEffect } from "react";

// Crear contexto
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role, ... }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al iniciar app, cargar token y user desde localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Función para hacer login (llamar API, guardar token y user)
  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al iniciar sesión");
      }

      const data = await res.json();

      // Aquí asumimos que backend envía token y username (puedes adaptar)
      // Pero necesitamos el rol, para eso puedes enviarlo también desde backend en login
      // Por ahora vamos a obtener el usuario completo con el token
      setToken(data.token);

      // Guardar token para futuras peticiones
      localStorage.setItem("token", data.token);

      // Obtener info del usuario (incluyendo rol) con token
      const userRes = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!userRes.ok) {
        throw new Error("No se pudo obtener info del usuario");
      }

      const userInfo = await userRes.json();

      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Saber si usuario es admin
  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAdmin,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar en componentes
export const useAuth = () => {
  return useContext(AuthContext);
};
