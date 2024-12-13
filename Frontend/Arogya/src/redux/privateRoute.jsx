import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Check if the user is authenticated and has the required role
  const hasAccess = isAuthenticated && user && user.role === requiredRole;
  // Guard for missing role
  if (!requiredRole) {
    console.error("Required role not specified for PrivateRoute.");
    return <Navigate to="/login" replace />;
  }
  console.log("i am in private route , HasAccess : ", hasAccess);

  return hasAccess ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
