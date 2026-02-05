import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || !role) return <Navigate to="/login" replace />;
if (!allowedRoles.includes(role)) return <Navigate to="/login" replace />;

return <Outlet />;
};

export default PrivateRoutes;
