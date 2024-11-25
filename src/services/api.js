import axios from "axios";
import router from "@/router";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");

      alert("Sua sessão expirou. Faça login novamente.");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
