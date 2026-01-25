import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ProfilePage.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    userName: "",
    email: "",
    joined: "",
    avatar: "https://via.placeholder.com/150",
  });

  // Load user data logic remains the same...
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        fullName: storedUser.fullName || "",
        userName: storedUser.userName || "",
        email: storedUser.email || "",
        joined: storedUser.createdAt ? new Date(storedUser.createdAt).toDateString() : "—",
        avatar: storedUser.avatar || "https://via.placeholder.com/150",
      });
    }
  }, []);

  return (
    <div className="profile-page-container">
      {/* 1. Header Bar */}
      <header className="profile-header-bar">
        <span className="header-icon">👤</span>
        <h2 style={{ margin: 0 }}>Profile</h2>
      </header>

      {/* 2. Main Profile Card */}
      <div className="profile-card-frame">
        <div className="profile-flex-container">
          
          {/* Left: Avatar & Edit Button */}
          <div className="profile-left-section">
            <div className="avatar-circle">
              <img src={userData.avatar} alt="Profile" />
            </div>
            <button className="edit-profile-btn" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Right: Input Fields */}
          <div className="profile-right-section">
            <div className="profile-input-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={userData.fullName} readOnly={!isEditing} onChange={(e) => setUserData({...userData, fullName: e.target.value})} />
            </div>

            <div className="profile-input-group">
              <label>User Name</label>
              <input type="text" name="userName" value={userData.userName} readOnly={!isEditing} onChange={(e) => setUserData({...userData, userName: e.target.value})} />
            </div>

            <div className="profile-input-group">
              <label>Email</label>
              <input type="email" value={userData.email} readOnly />
            </div>

            <div className="profile-input-group">
              <label>Joined</label>
              <input type="text" value={userData.joined} readOnly />
            </div>

            <div className="profile-actions-container">
              {isEditing && (
                <button className="save-profile-btn" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  Save Changes
                </button>
              )}
              <button className="profile-logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Log Out</button>
              <button className="delete-account-btn">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;