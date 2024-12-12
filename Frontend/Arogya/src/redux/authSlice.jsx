import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken"),
<<<<<<< HEAD
  role:localStorage.getItem("userRole") || null,
=======
  user: localStorage.getItem("userToken") || null,
>>>>>>> refs/remotes/origin/main
  isAuthenticated: !!localStorage.getItem("userToken"),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
<<<<<<< HEAD
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
=======
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
// >>>>>>> refs/remotes/origin/main
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
