import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const role = localStorage.getItem("role");
    return <Navigate to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"} replace />;
  }
  return <Outlet />;
};

export default PublicRoutes;