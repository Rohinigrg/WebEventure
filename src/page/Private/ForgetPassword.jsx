import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ForgetPassword.css";
import Logoo from "../../assets/Logoo.png";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log("Reset requested for:", email);
  };

  return (
    <div className="forget-password-page">
      <div className="forget-password-card">
        
        {/* Left Branding Section */}
        <div className="forget-left">
          <div className="logo-container">
            <img src={Logoo} alt="Logo" className="forget-logo" />
            <h2>Eventure</h2>
          </div>
          <p>Where event meets excellence.</p>
        </div>

        {/* Right Form Section */}
        <div className="forget-right">
          <h2>Forget Password?</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Please Enter Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>

            <p className="back-to-login" onClick={() => navigate("/login")}>
              Back to Login
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ForgetPassword;