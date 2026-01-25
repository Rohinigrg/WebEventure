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

  if (loading) return <div className="loading">Loading details...</div>;
  if (!event) return <div className="error">Event not found.</div>;

  return (
    <div className="event-details-container">
      {/* Small Header Tag */}
      <header className="details-header-tag">
        <span className="calendar-icon">📅</span>
        <h1>Event Details</h1>
      </header>

      {/* Main White Card */}
      <div className="details-card">
        <div className="details-upper">
          <div className="details-img-frame">
            <img 
              src={event.image || "https://via.placeholder.com/300x200"} 
              alt={event.title} 
            />
          </div>
          
          <div className="details-main-info">
            <h2 className="details-title">{event.title}</h2>
            <div className="info-item">
              <span className="icon">📍</span> {event.location}
            </div>
            <div className="info-item">
              <span className="icon">📅</span> {event.date}
            </div>
            <div className="info-item">
              <span className="icon">🕒</span> {event.time}
            </div>
          </div>
        </div>

        <div className="details-description-section">
          <h3>Event Description</h3>
          <p>{event.description}</p>
        </div>

        <div className="details-footer">
          <div className="slots-counter">
            <span className="green-indicator"></span>
            <span>{event.slotsLeft || 20} Slots Left</span>
          </div>
          <button className="status-button joined">Joined</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;