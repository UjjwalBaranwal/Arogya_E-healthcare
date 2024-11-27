import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken"),
  isAuthenticated: !!localStorage.getItem("userToken"),
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("userToken", action.payload);
      state.isAuthenticated = localStorage.getItem("userToken");
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userToken");
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
