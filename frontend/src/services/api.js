import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Autenticación
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const registerUser = (userData) => api.post("/auth/register", userData);

// Productos (requieren token para crear, editar, eliminar)// api.js
export const getProducts = (token) => {
  return api.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProduct = (product, token) =>
  api.post("/products", product, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (id, token) =>
  api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProductById = (id) => api.get(`/products/${id}`);

export const updateProduct = (id, product, token) =>
  api.put(`/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
