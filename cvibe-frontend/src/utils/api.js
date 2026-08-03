import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://cvibe-backend.onrender.com"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;