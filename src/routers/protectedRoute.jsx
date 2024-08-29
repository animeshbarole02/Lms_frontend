
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


// ProtectedRoute component to guard private routes
const ProtectedRoute = ({ children }) => {

  const { isAuthenticated } = useSelector((state) => state.auth);
  // Check if token exists and is valid
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;