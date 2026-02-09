import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../css/MyEventPage.css";

const MyEvents = () => {
  const navigate = useNavigate();

  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load joined events from localStorage
  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("myEvents")) || [];

    setMyEvents(storedEvents);
    setLoading(false);
  }, []);

  // Cancel (remove) event
  const handleCancel = (eventId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this event?"
    );
    if (!confirmCancel) return;

    const updatedEvents = myEvents.filter(
      (event) => event.id !== eventId
    );

    localStorage.setItem("myEvents", JSON.stringify(updatedEvents));
    setMyEvents(updatedEvents);

    toast.success("Event cancelled successfully");
  };

  return (
    <main className="admin-main">
      {/* HEADER */}
      <header className="admin-header">
        <span className="home-icon">📅</span>
        <h1>My Events</h1>
      </header>

      {/* CONTENT */}
      {loading ? (
        <p className="empty-text">Loading your events...</p>
      ) : myEvents.length === 0 ? (
        <p className="empty-text">You haven’t joined any events yet.</p>
      ) : (
        <div className="my-events-list">
          {myEvents.map((event) => (
            <div className="joined-event-card" key={event.id}>
              {/* IMAGE */}
              <div className="event-card-img">
                <img
                  src={
                    event.image?.startsWith("http")
                      ? event.image
                      : `http://localhost:5000/${event.image}`
                  }
                  alt={event.title}
                />
              </div>

              {/* DETAILS */}
              <div className="event-card-details">
                <h2 className="event-title">{event.title}</h2>

                <p className="event-meta">📍 {event.location}</p>

                <p className="event-meta">
                  🗓️ {new Date(event.date).toLocaleDateString()}
                </p>

                <p className="event-meta">
                  🕒 {event.startTime} - {event.endTime}
               </p>

                <p className="event-description">
                  {event.description}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="event-card-actions">
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(event.id)}
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
  );
};

export default MyEvents;