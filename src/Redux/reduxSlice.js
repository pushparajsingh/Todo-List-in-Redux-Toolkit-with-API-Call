import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getList = createAsyncThunk(
  "users/getList", // Unique action type prefix
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    ); // Replace with your API endpoint
    return response.data;
  }
);

export const store = createSlice({
  name: "Todo List",
  initialState: {
    TodoList: [],
    status: "",
    error: null,
  },
  reducers: {
    deleteItem: (state, action) => {
      state.TodoList = state.TodoList.filter(
        (item) => item.id !== action.payload
      );
    },
    addItem: (state, action) => {
      state.TodoList = [...state.TodoList, action.payload];
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    editList: (state, action) => {
      state.TodoList.splice(
        action.payload.toggle,
        1,
        action.payload.modelInputField
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.TodoList = action.payload;
      })
      .addCase(getList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { deleteItem, addItem, editList } = store.actions;

export const selectCount = (state) => state.store;

export default store.reducer;
