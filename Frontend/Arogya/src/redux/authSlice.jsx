import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken"),
  role:localStorage.getItem("userRole") || null,
  isAuthenticated: !!localStorage.getItem("userToken"),
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const {token,role}= action.payload;
      state.role=role;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole",role);
      state.isAuthenticated = localStorage.getItem("userToken");
    },
    logout: (state) => {
      state.token = null;
      state.role=null;
      state.isAuthenticated = false;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
