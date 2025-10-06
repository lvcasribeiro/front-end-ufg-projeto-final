import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5005/api/v1",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const tokenFromStorage = localStorage.getItem("tokenSynapsis");
    if (tokenFromStorage) {
      try {
        const token = JSON.parse(tokenFromStorage);
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token adicionado ao header:", token);
      } catch (error) {
        console.error("Erro ao parsear token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("tokenSynapsis");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;