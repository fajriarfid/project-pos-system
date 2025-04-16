import { Navigate } from "react-router-dom";
import { useAuth } from "../features/Auth/context";

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!currentUser && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
