import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { loadSession, clearSession, saveSession } from "../../app/sessionStorage";
import { login, register, updateRole } from "./userActions";

interface UserState{
  name: string,
  email: string,
  token: string,
  role: number,
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
}

const initialState: UserState = {
  name: loadSession('name') || "",
  email: loadSession('email') || "",
  token: loadSession('token') || "",
  role: parseInt(loadSession('role') || "0"),
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    clearToken: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
      state.role = 0;
      clearSession();
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      saveSession('name', action.payload.name);
      saveSession('email', action.payload.email);
      saveSession('token', action.payload.token);
      saveSession('role', action.payload.role);
      return state;
    })
    builder.addCase(login.rejected, (state) => {
      state.isError = true;
      state.isFetching = false;
    })
    builder.addCase(login.pending, (state) => {
      state.isFetching = true;
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      saveSession('name', action.payload.name);
      saveSession('email', action.payload.email);
      saveSession('token', action.payload.token);
      saveSession('role', action.payload.role);
      return state;
    })
    builder.addCase(register.rejected, (state) => {
      state.isError = true;
      state.isFetching = false;
    })
    builder.addCase(register.pending, (state) => {
      state.isFetching = true;
    })
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      saveSession('name', action.payload.name);
      saveSession('email', action.payload.email);
      saveSession('role', action.payload.role);
      return state;
    })
    builder.addCase(updateRole.rejected, (state) => {
      state.isError = true;
      state.isFetching = false;
    })
    builder.addCase(updateRole.pending, (state) => {
      state.isFetching = true;
    })
  },
});

export const { clearState, clearToken } = userSlice.actions;

export default userSlice;