import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/background-img.png";
import Logo from "../../assets/images/logo-synapsis.png";

export default function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="landing-root">
      {/* Background */}
      <div
        className="page-bg"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        aria-hidden="true"
      />

      {/* Navbar */}
      <nav className="navbar">
        <img src={Logo} alt="logo" className="img-logo" />
        <span className="logo-text">SYNAPSIS</span>
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <main className="main-content">
        <div className="hero-container">
          <h1 className="hero-text">CONECTE IDEIAS</h1>
        </div>
      </main>
    </div>
  );
}
