import ServerPrivateAPI from "../../services/ServerPrivateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FormTask {
    name: string,
    description: string,
    priority: number,
    overdueAt: Date
}

export const create = createAsyncThunk(
    "task/create",
    async ({ name, description, priority, overdueAt }: FormTask, { rejectWithValue }) => {
        try {
            const response = await ServerPrivateAPI("/task", {
                method: "POST",
                data: {
                    name,
                    description,
                    priority,
                    overdueAt
                },
            });
            if (response.status === 201) {
                return response.data;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const list = createAsyncThunk(
    "task/list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ServerPrivateAPI("/tasks", {
                method: "GET",
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const find = createAsyncThunk(
    "task/find",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await ServerPrivateAPI("/task" + id, {
                method: "GET"
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const update = createAsyncThunk(
    "task/update",
    async ({ id, name, description, priority, overdueAt, isFinished }: {
        id: string,
        name: string,
        description: string,
        priority: number,
        overdueAt: Date,
        isFinished: boolean
    }, { rejectWithValue }) => {
        try {
            const response = await ServerPrivateAPI("/task" + id, {
                method: "PUT",
                data: {
                    name,
                    description,
                    priority,
                    overdueAt,
                    isFinished
                }
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const del = createAsyncThunk(
    "task/del",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await ServerPrivateAPI("/task" + id, {
                method: "DELETE"
            });
            if (response.status === 200) {
                return response.data;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);