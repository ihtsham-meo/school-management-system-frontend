import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null, // "admin" | "teacher" | "student"
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    loginFailure(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;

export default authSlice.reducer;