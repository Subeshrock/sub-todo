import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabaseClient";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

export const loginUser = createAsyncThunk("user/login", async (data) => {
  let response = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return response.data.session;
});

export const signupUser = createAsyncThunk("user/signup", async (data) => {
  let response = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  let property = {
    email: response.data.user.email,
    aud: response.data.user.aud,
    toast: true,
  };
  return property;
});

const userReducer = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
    });
  },
});

export default userReducer.reducer;
