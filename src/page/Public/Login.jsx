import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../css/Login.css';
import Logoo from "../../assets/Logoo.png";
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // 👈 added

  const handleLogin = (e) => {
   e.preventDefault();
   setError("");

   if (!email || !password) {
     setError("Please fill all fields");
     return;
   }

   if (email === "admin@gmail.com" && password === "admin123") {
    localStorage.setItem("role", "admin");
    navigate("/admin/dashboard", { replace: true }); // Correct path
    return;
  }

  // Normal user
   localStorage.setItem("role", "user");
   navigate("/user/dashboard", { replace: true }); // Correct path
  };


  return (
    <div className="login-page">
      <div className="login-card">

        {/* Left Section */}
        <div className="login-left">
          <img src={Logoo} alt="Logo" className="login-logo" />
          <h2>Eventure</h2>
          <p>Where event meets excellence.</p>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <h2>Welcome Back!</h2>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <img
                  src={showPassword ? viewIcon: hideIcon}
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  alt="toggle password"
                />
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}

            <p className="forgot"> 
               <Link to="/forgot-password">Forgot Password?</Link>
            </p>

            <button type="submit" className="login-btn">
              Log in
            </button>

            <p className="signup-text">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
