// api.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/";

// Create Axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // or from Redux/store/context
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
