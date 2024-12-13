import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken"),
  user: JSON.parse(localStorage.getItem("user") || "undefined") || null,
  isAuthenticated: !!localStorage.getItem("userToken"),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      console.log("i am in slice", user);

      // Store in localStorage
      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;