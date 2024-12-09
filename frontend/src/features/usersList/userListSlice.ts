import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { list } from "./userListActions";

interface User {
  id: string,
  name: string
}

interface UserListState{
  users: Array<User>,
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
}

const initialState: UserListState = {
  users: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    clearState: (state) => {
      state.users = [];
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserListState>) => {
    builder.addCase(list.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.users = action.payload.users;
      return state;
    })
    builder.addCase(list.rejected, (state) => {
      state.isError = true;
      state.isFetching = false;
    })
    builder.addCase(list.pending, (state) => {
      state.isFetching = true;
    })
  },
});

export const { clearState } = userSlice.actions;

export default userSlice;