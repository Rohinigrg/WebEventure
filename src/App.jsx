import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./page/Public/LandingPage";
import Login from "./page/Public/Login";
import Register from "./page/Public/Register";
import PrivateRoutes from "./Routes/PrivateRoutes";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User pages
import UserDashboard from "./page/Private/UserDashboard";
import ProfilePage from "./page/Private/ProfilePage";
import MyEventPage from "./page/Private/MyEventPage";

// Admin pages
import AdminDashboard from "./page/Private/AdminDashboard";
import ManageEvents from "./page/Private/ManageEvent";
import { Toaster } from "react-hot-toast";
import EventDetails from "./page/Private/EventDetails";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PROTECTED */}
        <Route element={<PrivateRoutes allowedRoles={["user"]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="event-details/:id" element={<EventDetails/>}/>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="myEvents" element={<MyEventPage />} />
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
    </>
  );
}
export default App;
