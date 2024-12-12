import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const {isAuthenticated,role} = useSelector((state) => state.auth);
  console.log(isAuthenticated+  "token has receievd");
  if(isAuthenticated && role=='patient'){
     return <Outlet/>
  }
  if(isAuthenticated && role=='doctor'){
    return <Outlet/>
  }
  return <Navigate to='/login'/>
};

export default PrivateRoute;


