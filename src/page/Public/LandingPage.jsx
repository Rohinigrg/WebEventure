import React from "react";
import '../../css/LandingPage.css';
import landingbg from "../../assets/landingbg.png";
import Logoo from "../../assets/Logoo.png";
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div
      className="landing"
      style={{ backgroundImage: `url(${landingbg})` }}
    >
      {/* Navbar */}
<       div className="content-wrapper">
        <nav className="navbar">
          <div className="logo">
            <img src={Logoo} alt="Logo" />
          </div>
          <div className="nav-buttons">
            <Link to="/login" className="btn outline">Login</Link>
           <Link to="/register" className="btn filled">Sign Up</Link>
          </div>
        </nav>

      {/* Hero Content */}
      <div className="hero">
        <h1>Community Event<br />Management System</h1>
        <p>
          Organize, manage and promote<br />
          events for your community in one platform!
        </p>
      </div>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <h3>Create Events</h3>
          <p>Easily create and publish community events.</p>
        </div>

        <div className="card">
          <h3>Discover Events</h3>
          <p>Find local and community events happening near you.</p>
        </div>

        <div className="card">
          <h3>Join and Connect</h3>
          <p>Meet new people, and participate in community activities.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LandingPage;
