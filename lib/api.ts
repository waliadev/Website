import axios from "axios";
import { getToken } from "@/utils/token";

const BASE_URL = "https://api.brokerdash.in/v1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use(
  (config) => {
    config.headers["Cache-Control"] = "no-store";
  config.headers["Pragma"] = "no-cache";
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

   

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or invalid");
      // optional auto logout
      // removeToken();
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;