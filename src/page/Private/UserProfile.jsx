import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ProfilePage.css"; // Ensure this path is 100% correct
import Logoo from "../../assets/Logoo.png";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; 
    };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="logo-container">
          <img src={Logoo} alt="Logo" className="logo-img" />
          <span className="logo-text">Eventure</span>
        </div>
        <nav className="menu">
          <button className="menu-item" onClick={() => navigate("/user/dashboard")}>Dashboard</button>
          <button className="menu-item">My events</button>
          <button className="menu-item active">Profile</button>
        </nav>
      </aside>

      <main className="main-content">
        <div className="profile-header-container">
          <header className="profile-header-bar">
            <span className="header-icon">👤</span>
            <h2>Profile</h2>
          </header>
        </div>

        {/* This div creates the thick gray frame */}
        <div className="profile-card-frame">
          <div className="profile-flex-container">
            
            {/* Left: Image and Edit Button */}
            <div className="profile-left-section">
              <div className="avatar-circle">
                <img src="profile.png" alt="Profile" />
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>

            {/* Right: Form fields and Action buttons */}
            <div className="profile-right-section">
              <div className="profile-input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter Full Name" />
              </div>
              <div className="profile-input-group">
                <label>User Name</label>
                <input type="text" placeholder="Enter Username" />
              </div>
              <div className="profile-input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter Email" />
              </div>
              <div className="profile-input-group">
                <label>Joined</label>
                <input type="text" placeholder="Joined Date" />
              </div>

              <div className="profile-actions-container">
              <button className="profile-logout-btn" onClick={handleLogout}>
                Log Out
              </button>                
              <button className="delete-account-btn">Delete Account</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;