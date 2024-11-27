import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated+  "token has receievd");
  return isAuthenticated?<Outlet/> :<Navigate to="/login"/>
};

export default PrivateRoute;

