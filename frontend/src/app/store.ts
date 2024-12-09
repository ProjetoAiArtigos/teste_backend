import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import taskSlice from "../features/tasks/taskSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tasks: taskSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;