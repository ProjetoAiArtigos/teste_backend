import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { create, del, find, list, update } from "./taskActions";

interface Task {
    id: string,
    name: string,
    description: string,
    priority: number,
    overdueAt: Date,
    createdBy: string,
    finishedBy?: string,
    finishedDate?: Date,
    isFinished: boolean
}

interface TasksState {
    tasks: Array<Task>,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
}

const initialState = {
    tasks: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<TasksState>) => {
        builder.addCase(create.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.tasks.push(action.payload);
            return state;
        })
        builder.addCase(create.rejected, (state) => {
            state.isError = true;
            state.isFetching = false;
        })
        builder.addCase(create.pending, (state) => {
            state.isFetching = true;
        })
        builder.addCase(list.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.tasks = action.payload;
            return state;
        })
        builder.addCase(list.rejected, (state) => {
            state.isError = true;
            state.isFetching = false;
        })
        builder.addCase(list.pending, (state) => {
            state.isFetching = true;
        })
        builder.addCase(find.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.tasks.forEach((task: Task, index: number) => { 
                if (task.id === action.payload.id) {
                    state.tasks[index] = action.payload
                }
            });
            return state;
        })
        builder.addCase(find.rejected, (state) => {
            state.isError = true;
            state.isFetching = false;
        })
        builder.addCase(find.pending, (state) => {
            state.isFetching = true;
        })
        builder.addCase(update.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.tasks.forEach((task: Task, index: number) => {
                if (task.id === action.payload.id) {
                    state.tasks[index] = action.payload
                }
            });
            return state;
        })
        builder.addCase(update.rejected, (state) => {
            state.isError = true;
            state.isFetching = false;
        })
        builder.addCase(update.pending, (state) => {
            state.isFetching = true;
        })
        builder.addCase(del.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.tasks = state.tasks.filter((task: Task) => {
                return (task.id !== action.payload.id)
            });
            return state;
        })
        builder.addCase(del.rejected, (state) => {
            state.isError = true;
            state.isFetching = false;
        })
        builder.addCase(del.pending, (state) => {
            state.isFetching = true;
        })
    },
});

export const { clearState } = taskSlice.actions;

export default taskSlice;