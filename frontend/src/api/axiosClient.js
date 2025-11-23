import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000
});

// Optional: Request interceptor
api.interceptors.request.use(
  (config) => {
    // future: attach auth token
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(new Error(msg));
  }
);

export default api;
