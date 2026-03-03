import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ProfilePage.css";
import toast, { Toaster } from "react-hot-toast";
import { apiRequest } from "../../utils/api";

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

  useEffect(() => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    setUserData({
      fullName: user.fullName ?? "",
      userName: user.userName ?? "",
      email: user.email ?? "",
      joined: user.createdAt
        ? new Date(user.createdAt).toDateString()
        : "—",
      avatar: user.avatar && user.avatar !== ""
        ? user.avatar
        : "https://via.placeholder.com/150",
    });
  } catch (err) {
    console.error("Failed to load user from localStorage", err);
  }
}, []);
  
   const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("userName", userData.userName);

    if (userData.avatarFile) {
      formData.append("avatar", userData.avatarFile);
    }

    const res = await apiRequest("PUT", "/users/profile", {
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const updatedUser = res.user;

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUserData((prev) => ({
      ...prev,
      fullName: updatedUser.fullName,
      userName: updatedUser.userName,
      avatar: updatedUser.avatar
        ? `http://localhost:5000/${updatedUser.avatar}?t=${Date.now()}`
        : prev.avatar,
    }));

    setIsEditing(false);
    toast.success("Profile updated successfully 🎉");
  } catch (err) {
    toast.error("Failed to update profile ❌");
  }
};
const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your account?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:5000/api/users/profile", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // 1. Clear credentials immediately
    localStorage.clear();

    // 2. Show the toast
    toast.success("Account deleted successfully ✅");

    // 3. Force navigation after a short delay (1.5 seconds)
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);

  } catch (err) {
    toast.error(err.message || "Failed to delete account", { duration: 2000 });
  }
};

  return (
    <div className="profile-page-container">
      {/* 1. Header Bar */}
      <Toaster position="top-right" />
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
               <img
                 src={
                   userData.avatar.startsWith("http")
                    ? userData.avatar
                    : `http://localhost:5000/${userData.avatar}`
                  }
                   alt="Profile"
               />

            </div>



            {isEditing && (
              <input
                 type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setUserData({
                    ...userData,
                    avatarFile: file,
                    avatar: URL.createObjectURL(file), // 👈 instant preview
                    });
                  }}
                />

          )}

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
                <button className="save-profile-btn" onClick={handleSave}>
                  Save Changes
                </button>

              )}
              <button className="profile-logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>Log Out</button>
              <button className="delete-account-btn" onClick={handleDelete}>
                  Delete Account
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;