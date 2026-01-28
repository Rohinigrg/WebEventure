import React, { useState } from "react";
import axios from "axios";
import "../../css/ManageEvent.css";
import toast from "react-hot-toast";

const ManageEvents = () => {
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
    Object.keys(eventData).forEach((key) => {
      if (key === "image" && eventData.image) {
         formData.append(key, eventData.image);
       } else {
         formData.append(key, eventData[key]);
       }
     });


    try {
      await axios.post("http://localhost:5000/api/events", formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Event Created Successfully!");

      setEventData({
        title: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
        slots: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event");

    }
  };

  return (
    <>
      <header className="admin-header">
        <span className="icon">📅</span>
        <h1>Manage Events</h1>
      </header>

      <div className="manage-events-scroll">
        <form className="manage-event-form" onSubmit={handleSubmit}>
          <div className="image-upload-container">
            <label htmlFor="image-input" className="image-preview-box">
              {preview ? (
                <img src={preview} alt="Preview" className="displayed-image" />
              ) : (
                <span className="camera-icon">📷</span>
              )}
            </label>

            <input
              type="file"
              id="image-input"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-fields">
            <div className="input-group">
              <label>Event Title</label>
              <input name="title" value={eventData.title} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Location</label>
              <input name="location" value={eventData.location} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Date</label>
              <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Start Time</label>
              <input
                type="time"
                name="startTime"
                value={eventData.startTime}
                onChange={handleChange}
                required
             />
              </div>

              <div className="input-group">
               <label>End Time</label>
               <input
                type="time"
                name="endTime"
                value={eventData.endTime}
                onChange={handleChange}
                required
              />
            </div>


            <div className="input-group">
              <label>Description</label>
              <textarea name="description" value={eventData.description} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label>Slots</label>
              <input type="number" name="slots" value={eventData.slots} onChange={handleChange} required />
            </div>

            <button type="submit" className="create-event-btn">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManageEvents;
