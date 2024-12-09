import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 10000
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
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
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            if (response.status === 401) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(response?.data || error.message);
    }
);

export default api;
