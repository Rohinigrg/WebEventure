// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logoo from "../assets/Logoo.png";
import "../Layouts/UserLayout.css";

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src={Logoo} alt="Logo" className="logo-img" />
          <span className="logo-text">Eventure</span>
        </div>

        <nav className="menu">
          <button
            className={`menu-item ${location.pathname === "/user/dashboard" ? "active" : ""}`}
            onClick={() => navigate("/user/dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`menu-item ${location.pathname === "/user/myEvents" ? "active" : ""}`}
            onClick={() => navigate("/user/myEvents")}
          >
            My Events
          </button>

          <button
            className={`menu-item ${location.pathname === "/user/profile" ? "active" : ""}`}
            onClick={() => navigate("/user/profile")}
          >
            Profile
          </button>


        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
