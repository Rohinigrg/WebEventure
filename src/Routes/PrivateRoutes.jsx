import { Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "../page/Private/UserDashboard";
import AdminDashboard from "../page/Private/AdminDashboard";
import ManageEvents from "../page/Private/ManageEvent";
import ProfilePage from "../page/Private/ProfilePage"; // Ensure this is imported

const PrivateRoutes = () => {
  const role = localStorage.getItem("role");

  // 1. Redirect to login if no role is found
  if (!role) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      {/* 2. Base path redirect based on role */}
      <Route 
        path="/" 
        element={role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />} 
      />

      {/* 3. USER ROUTES - Wrapped in a Fragment */}
      {role === "user" && (
        <>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </>
      )}

      {/* 4. ADMIN ROUTES */}
      {role === "admin" && (
        <>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-events" element={<ManageEvents />} />
        </>
      )}

      {/* 5. CATCH-ALL: Prevents blank screens if a user enters a wrong URL */}
      <Route 
        path="*" 
        element={role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />} 
      />
    </Routes>
  );
};

export default PrivateRoutes;