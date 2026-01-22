import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./page/Public/LandingPage";
import Login from "./page/Public/Login";
import Register from "./page/Public/Register";
import PrivateRoutes from "./Routes/PrivateRoutes";

// User pages
import UserDashboard from "./page/Private/UserDashboard";
import ProfilePage from "./page/Private/ProfilePage";

// Admin pages
import AdminDashboard from "./page/Private/AdminDashboard";
import ManageEvents from "./page/Private/ManageEvent";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER PROTECTED */}
      <Route element={<PrivateRoutes allowedRoles={["user"]} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Route>

      {/* ADMIN PROTECTED */}
      <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-events" element={<ManageEvents />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
