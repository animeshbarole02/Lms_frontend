
import { Navigate } from "react-router-dom";

// ProtectedRoute component to guard private routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Check if token exists and is valid
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;