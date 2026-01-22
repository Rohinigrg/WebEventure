import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
  const role = localStorage.getItem("role");

  // Not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Authorized → allow access
  return <Outlet />;
};

export default PrivateRoutes;
