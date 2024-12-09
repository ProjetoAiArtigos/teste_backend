import api from "./api";

export const getTasks = async () => api.get("/tasks");
export const getTaskById = async (id) => api.get(`/tasks/${id}`);
export const createTask = async (task) => api.post("/tasks", task);
export const updateTask = async (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = async (id) => api.delete(`/tasks/${id}`);
