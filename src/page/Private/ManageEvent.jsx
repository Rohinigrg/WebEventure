import React, { useState } from "react";
import axios from "axios";
import "../../css/ManageEvent.css"; 
import Logoo from "../../assets/logoo.png";
// 1. Import navigation hooks
import { useNavigate, useLocation } from "react-router-dom";

const ManageEvents = () => {
  // 2. Initialize hooks
  const navigate = useNavigate();
  const location = useLocation();

  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    slots: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setEventData({ ...eventData, image: file });
  setPreview(URL.createObjectURL(file));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("location", eventData.location);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("description", eventData.description);
    formData.append("slots", eventData.slots);
    formData.append("image", eventData.image);

    try {
      const res = await axios.post("http://localhost:5000/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event Created Successfully!");
      setEventData({ title: "", location: "", date: "", time: "", description: "", slots: "", image: null });
      setPreview(null);
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-logo-section">
          <img src={Logoo} alt="Logo" className="admin-logo-img" />
          <span className="admin-logo-text">Eventure</span>
        </div>
        <nav className="admin-nav">
          {/* 3. Add the onClick and active class logic to the Dashboard button */}
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
            Manage Event
          </button>
        </nav>
        <button className="logout-btn" onClick={() => navigate("/login")}>Log Out</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
           <span className="icon">📅</span>
           <h1>Manage Events</h1>
        </header>

        <div className="admin-content-card">
          <form className="manage-event-form" onSubmit={handleSubmit}>
            <div className="image-upload-container">
              <label htmlFor="image-input" className="image-preview-box">
                {preview ? (
                  <img src={preview} alt="Event Preview"  className="displayed-image"/>
                ) : (
                  <span className="camera-icon">📷</span>
                )}
              </label>
              <input type="file" id="image-input" hidden accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="form-fields">
              <div className="input-group">
                <label>Event Title</label>
                <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Location</label>
                <input type="text" name="location" value={eventData.location} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Date</label>
                <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Time</label>
                <input type="text" name="time" placeholder="e.g. 12:00 PM - 4:00 PM" value={eventData.time} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea name="description" value={eventData.description} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Slots</label>
                <input type="number" name="slots" value={eventData.slots} onChange={handleChange} required />
              </div>
              <button type="submit" className="create-event-btn">Create Events</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ManageEvents;