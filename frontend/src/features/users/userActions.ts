import ServerPublicApi from "../../services/ServerPublicAPI";
import ServerPrivateApi from "../../services/ServerPrivateAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FormLogin {
  email: string,
  password: string
}

interface FormRegister {
  email: string,
  password: string,
  name: string,
  rg: string
}

interface RoleUpdate {
  role: number
}


export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: FormLogin, { rejectWithValue }) => {
    try {
      const response = await ServerPublicApi("/login", {
        method: "POST",
        data: {
          email,
          password
        },
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

export const register = createAsyncThunk(
  "user/register",
  async ({ email, password, name, rg }: FormRegister, { rejectWithValue }) => {
    try {
      const response = await ServerPublicApi("/register", {
        method: "POST",
        data: {
          email,
          password,
          name,
          rg
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

export const updateRole = createAsyncThunk(
  "user/role",
  async ({ role }: RoleUpdate, { rejectWithValue }) => {
    try {
      const response = await ServerPrivateApi("/user", {
        method: "POST",
        data: {
          role
        },
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