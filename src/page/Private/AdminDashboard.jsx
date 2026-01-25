import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/AdminDashboard.css";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [totalUsers, setTotalUsers] = useState(3);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/events")
    .then((res) => {
      setEvents(res.data.data); // because backend sends { data: events }
    })
    .catch((err) => console.error(err));
}, []);

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/events/${id}`);

    // Remove from UI instantly
    setEvents(prev => prev.filter(event => event.id !== id));

    toast.success("Event deleted successfully!");
  } catch (err) {
    toast.error("Failed to delete event");
  }
};


  return (
    <>
      <header className="admin-header">
        <span className="home-icon">🏠</span>
        <h1>Dashboard</h1>
      </header>

      <div className="admin-content-card">
        <h2 className="welcome-text">Welcome, Admin!</h2>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-icon">📅</div>
            <div>
              <p>Total Events</p>
              <h3>{events.length}</h3>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">👥</div>
            <div>
              <p>Total Users</p>
              <h3>{totalUsers}</h3>
            </div>
          </div>
        </div>

        {/* EVENTS */}
        <div className="admin-events-section">
          <h2 className="section-title">Events</h2>

          {events.map((event) => (
            <div className="admin-event-row" key={event.id}>
              <img
                src={
                  event.image?.startsWith("http")
                    ? event.image
                    : `http://localhost:5000/${event.image}`
                }
                alt={event.title}
              />

              <div>
                <h3>{event.title}</h3>
                <p>📍 {event.location}</p>
                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                <p>🕒 {event.time}</p>
                <p>🎫 Slots: {event.slots}</p>
                <p className="event-desc">☰ {event.description}</p>

              
              </div>

              <button
                className="remove-btn"
                onClick={() => handleDelete(event.id)}
              >
              Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
