// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logoo from "../assets/Logoo.png";
import "../Layouts/AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="admin-wrapper">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo-section">
          <img src={Logoo} alt="Logo" className="admin-logo-img" />
          <span className="admin-logo-text">Eventure</span>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`admin-nav-item ${location.pathname === "/admin/manage-events" ? "active" : ""}`}
            onClick={() => navigate("/admin/manage-events")}
          >
            Manage Events
          </button>

          <button
            className="admin-nav-item logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
