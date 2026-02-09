import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role missing or invalid
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
