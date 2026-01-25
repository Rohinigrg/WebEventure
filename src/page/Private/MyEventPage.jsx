import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/MyEventPage.css";
import logoo from "../../assets/logoo.png";
import { useLocation, useNavigate } from "react-router-dom";

const MyEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/my-events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyEvents(
          Array.isArray(res.data) ? res.data : res.data.data || []
        );
      } catch (error) {
        console.error("Error fetching my events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [token]);

  const handleCancel = async (eventId) => {
    if (!window.confirm("Are you sure you want to cancel this event?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/my-events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove cancelled event from UI
      setMyEvents((prev) =>
        prev.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error("Cancel failed:", error);
      alert("Failed to cancel event");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <span className="home-icon">📅</span>
          <h1>My Events</h1>
        </header>
          {loading ? (
            <p className="empty-text">Loading your events...</p>
          ) : myEvents.length === 0 ? (
            <p className="empty-text">You haven’t joined any events yet.</p>
          ) : (
            <div className="my-events-list">
              {myEvents.map((event) => (
                <div className="joined-event-card" key={event._id}>
                  <div className="event-card-img">
                    <img
                      src={event.image || "https://via.placeholder.com/300x200"}
                      alt={event.title}
                    />
                  </div>

                  <div className="event-card-details">
                    <h2 className="event-title">{event.title}</h2>
                    <p className="event-meta">📍 {event.location}</p>
                    <p className="event-meta">🗓️ {event.date}</p>
                    <p className="event-meta">🕒 {event.time}</p>
                    <p className="event-description">
                      {event.description}
                    </p>
                  </div>

                  <div className="event-card-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(event._id)}
                    >
                      Cancel
                    </button>
                    <div className="joined-status">Joined</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        
      </main>
    </>
  );
};

export default MyEvents;
