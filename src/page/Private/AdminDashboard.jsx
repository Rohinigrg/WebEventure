import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/AdminDashboard.css";
import logoo from "../../assets/logoo.png";
import { useLocation, useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();


  const [events, setEvents] = useState([]);
  const [totalUsers, setTotalUsers] = useState(3); // Example stat from design

  useEffect(() => {
    // Fetching from your existing events API
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(Array.isArray(res.data) ? res.data : res.data.data || []);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);
  
const handleLogout = () => {
  localStorage.clear();                // clear token/role
  navigate("/login", { replace: true }); // redirect to login page
};


  const handleRemove = (id) => {
    // Logic to delete event from backend
    console.log("Removing event:", id);
  };

  return (
    <div className="admin-wrapper">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo-section">
          <img src={logoo} alt="Logo" className="admin-logo-img" />
          <span className="admin-logo-text">Eventure</span>
        </div>
        
        <nav className="admin-nav">
        <button
          className={`admin-nav-item ${
            location.pathname === "/admin/dashboard" ? "active" : ""
          }`}
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </button>
        <button 
          className="admin-nav-item"
          onClick={() => navigate("/admin/manage-events")}
        >
          Manage Events
        </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
         Log Out
       </button>
        </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <span className="home-icon">🏠</span>
          <h1>Dashboard</h1>
        </header>

        <div className="admin-content-card">
          <h2 className="welcome-text">Welcome, Admin!</h2>

          {/* STATS ROW */}
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-icon">📅</div>
              <div className="stat-details">
                <p>Total Events</p>
                <h3>{events.length}</h3>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon">👥</div>
              <div className="stat-details">
                <p>Total Users</p>
                <h3>{totalUsers}</h3>
              </div>
            </div>
          </div>

          {/* EVENTS MANAGEMENT LIST */}
          <div className="admin-events-section">
            <h2 className="section-title">Events</h2>
            <div className="admin-events-list">
              {events.map((event) => (
                // ... inside your events.map ...
<div className="admin-event-row" key={event.id || event._id}>
  <div className="event-img-placeholder">
    {/* Ensure the src is correct. 
      If event.image is just a filename, use: `http://localhost:5000/${event.image}`
    */}
    <img 
      src={event.image.startsWith('http') ? event.image : `http://localhost:5000/${event.image}`} 
      alt={event.title} 
      onError={(e) => { e.target.src = 'https://via.placeholder.com/140x90?text=No+Image'; }}
    />
  </div>
  
  <div className="admin-event-info">
    <h3>{event.title}</h3>
    <p>📍 {event.location}</p>
    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
    <p>🕒 {event.time || "12:00 PM - 4:00 PM"}</p>
  </div>
  
  <button 
    className="remove-btn" 
    onClick={() => handleRemove(event.id || event._id)}
  >
    Remove
  </button>
</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;