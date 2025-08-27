import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <Loading />;
  }

  if (user && role === "admin") {
    return children;
  }

  // Redirect to login, but save the location they were trying to go to
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
