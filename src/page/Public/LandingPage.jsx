import React from "react";
import { Link } from "react-router-dom";
import '../../css/LandingPage.css';
import Logoo from "../../assets/Logoo.png";

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="container">

        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-left">
            <img src={Logoo} alt="Logo" />
            <span className="brand">Eventure</span>
          </div>

          <div className="nav-right">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-signup">Sign Up</Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="hero">
          <div className="hero-left">
            <h1>
              Community Event <br /> Management System
            </h1>
            <p>
              Organize, manage and promote events for your community in one platform.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="features">
          <div className="feature-card">
            <h3>Create Events</h3>
            <p>Easily create and publish community events.</p>
          </div>

          <div className="feature-card">
            <h3>Discover Events</h3>
            <p>Find local and community events happening near you.</p>
          </div>

          <div className="feature-card">
            <h3>Join and Connect</h3>
            <p>Meet new people and participate in community activities.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
