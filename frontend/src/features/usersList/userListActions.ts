import ServerPrivateApi from "../../services/ServerPrivateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const list = createAsyncThunk(
  "user/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ServerPrivateApi("/users", {
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