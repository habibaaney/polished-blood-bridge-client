// import { Navigate } from "react-router";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import useUserRole from "../hooks/useUserRole";
// import Loading from "../pages/Loading";

// const DonorRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const {role, isLoading} = useUserRole();

//   if (loading || isLoading) return <Loading></Loading>;

//   if (user && role === "donor") return children;

//   return <Navigate to="/" replace />;
// };

// export default DonorRoute;

import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/Loading";

const DonorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) return <Loading />;

  if (user && role === "donor") return children;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/" replace />;
};

export default DonorRoute;
