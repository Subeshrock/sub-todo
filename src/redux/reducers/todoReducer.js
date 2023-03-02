import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabaseClient";

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

export const getTodos = createAsyncThunk("todo/get", async () => {
  let response = await supabase.from("todo").select("*");
  return response.data;
});

export const createTodo = createAsyncThunk("todo/create", async (data) => {
  data.user_id;
  let response = await supabase.from("todo").insert([
    {
      title: data.title,
      description: data.description,
      category: data.category,
      user_id: data.user_id,
    },
  ]);
});

export const updateTodo = createAsyncThunk("todo/update", async (data) => {
  let response = await supabase
    .from("todo")
    .update({
      title: data?.title,
      description: data?.description,
      category: data?.category,
      is_completed: data.is_completed,
    })
    .eq("id", data.id);
});

export const deleteTodo = createAsyncThunk("todo/delete", async (id) => {
  let response = await supabase.from("todo").delete().eq("id", id);
});

const todoReducer = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(getTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.payload.error;
    });
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading = false;
      // state.todos = action.payload;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      // state.todos = [];
      state.error = action.error.message;
    });
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = false;
      // state.todos = action.payload;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading = false;
      // state.todos = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = false;
      // state.todos = action.payload;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      // state.todos = [];
      state.error = action.error.message;
    });
  },
});

export default todoReducer.reducer;
