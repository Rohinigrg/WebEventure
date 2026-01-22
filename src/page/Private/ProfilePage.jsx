import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import "../../css/ProfilePage.css";
import Logoo from "../../assets/Logoo.png";

const UserProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
   
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
          <button className="menu-item" onClick={() => navigate("/user/events")}>My events</button>
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

        <div className="profile-card-frame">
          <div className="profile-flex-container">
            <div className="profile-left-section">
              <div className="avatar-circle">
                <img src="https://via.placeholder.com/150" alt="Profile" />
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>

            <div className="profile-right-section">
              {/* ✅ Added missing fields and tied them to state value */}
              <div className="profile-input-group">
                <label>Full Name</label>
                <input type="text" value={userData.fullName} readOnly />
              </div>

              <div className="profile-input-group">
                <label>User Name</label>
                <input type="text" value={userData.userName} readOnly />
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