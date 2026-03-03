import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes.jsx";
import PrivateRoutes from "./Routes/PrivateRoutes.jsx";

// Public pages
import LandingPage from "./page/Public/LandingPage.jsx";
import Login from "./page/Public/Login.jsx";
import Register from "./page/Public/Register.jsx";
import ForgetPassword from "./page/Private/ForgetPassword.jsx";

// Layouts
import AdminLayout from "./Layouts/AdminLayout.jsx";
import UserLayout from "./Layouts/UserLayout.jsx";

// User pages
import UserDashboard from "./page/Private/UserDashboard.jsx";
import ProfilePage from "./page/Private/ProfilePage.jsx";
import MyEventPage from "./page/Private/MyEventPage.jsx";
import EventDetails from "./page/Private/EventDetails.jsx";

// Admin pages
import AdminDashboard from "./page/Private/AdminDashboard.jsx";
import ManageEvents from "./page/Private/ManageEvent.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Route>

      {/* USER PROTECTED */}
      <Route element={<PrivateRoutes allowedRoles={["user"]} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="event-details/:id" element={<EventDetails />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="my-events" element={<MyEventPage />} />
        </Route>
      </Route>

      {/* ADMIN PROTECTED */}
      <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-events" element={<ManageEvents />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;