import api from "./api";

// Função para registrar um usuário
export const registerUser = async (userData) => {
    return api.post("/auth/register", userData);
};

// Função para login
export const loginUser = async (credentials) => {
    return api.post("/auth/login", credentials);
};
