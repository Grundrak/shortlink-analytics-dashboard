import axios from "axios";

// Debug actual API URL being used
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4521/api';
console.log('API URL being used:', apiUrl);

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 30000, // Increase timeout to 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for common error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 unauthorized errors (expired token)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
