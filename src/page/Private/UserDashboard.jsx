import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../css/UserDashboard.css";
import Logoo from "../../assets/Logoo.png";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);

  const handleLogout = () => {
  localStorage.clear();                // clear token/role
  navigate("/login", { replace: true }); // redirect to login page
};


  // Fetch events from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(Array.isArray(res.data) ? res.data : res.data.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

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
            className={`menu-item ${
              location.pathname === "/user/dashboard" ? "active" : ""
            }`}
            onClick={() => navigate("/user/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`menu-item ${
              location.pathname === "/user/my-events" ? "active" : ""
            }`}
            onClick={() => navigate("/user/my-events")}
          >
            My Events
          </button>
          <button
            className={`menu-item ${
              location.pathname === "/user/profile" ? "active" : ""
            }`}
            onClick={() => navigate("/user/profile")}
          >
            Profile
          </button>
        </nav>


      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
        <header className="welcome-header">
          <div className="user-profile-left">
            <div className="icon-circle">👤</div>
            <h2>Welcome, Rohini</h2>
          </div>

          {/* Top-right profile icon */}
          <div
            className={`icon-circle profile-right ${
              location.pathname === "/user/profile" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/user/profile")}
          >
            👤
          </div>
        </header>

        {/* SEARCH */}
        <div className="search-section">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        {/* EVENTS LIST */}
        <section className="events-container">
          {events.length === 0 ? (
            <div className="no-events-card">No events available</div>
          ) : (
            events.map((event) => (
              <div className="event-card" key={event.id}>
                <div className="event-img-box">
                  <img src={event.image} alt={event.title} />
                </div>

                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="info-row">📍 {event.location}</p>
                  <p className="info-row">📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p className="info-row">🕒 {event.time || "Not specified"}</p>
                  <div className="description-row">
                    <span className="desc-icon">☰</span>
                    <p>{event.description}</p>
                  </div>
                </div>

                <div className="event-actions">
                  <button className="join-btn">
                    <span className="dot-blue"></span> Join Event
                  </button>
                  <div className="slots-tag">
                    <span className="square-green"></span> {event.slots || 0} Slots Left
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
