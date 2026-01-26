import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(res.data.data || res.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id, token]);

  if (loading) return <main className="admin-main"><p className="empty-text">Loading details...</p></main>;
  if (!event) return <main className="admin-main"><p className="empty-text">Event not found.</p></main>;

  // Image path logic consistent with your Dashboard
  const imageUrl = event.image?.startsWith("http")
    ? event.image
    : `http://localhost:5000/${event.image}`;

  return (
    <main className="admin-main">
      {/* HEADER LABEL */}
      <header className="details-header-label">
        <span className="home-icon">📅</span>
        <h1>Event Details</h1>
      </header>

      {/* MAIN EVENT CARD */}
      <div className="event-details-card">
        <div className="event-details-top">
          <div className="details-img-container">
            <img src={imageUrl} alt={event.title} />
          </div>

          <div className="details-info-column">
            <h2 className="details-title">{event.title}</h2>
            <p className="details-meta">📍 {event.location}</p>
            <p className="details-meta">
              🗓️ {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="details-meta">🕒 {event.time || "Not specified"}</p>
          </div>
        </div>

        <div className="details-description-box">
          <h3>Event Description</h3>
          <p>{event.description}</p>
        </div>

        <div className="details-action-footer">
          <div className="slots-tag">
            <span className="square-green"></span>
            {event.slots || 0} Slots Left
          </div>
          <button className="joined-btn">Joined</button>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;