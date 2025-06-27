import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo-text">BOOK A DOCTOR</div>
        <nav>
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="/register" className="btn btn-register">Register</Link>
        </nav>
      </header>
      <main className="landing-main">
        <div className="hero-content">
          <h1>Effortlessly schedule your doctor</h1>
          <p>appointments with just a few clicks, putting your health in your hands.</p>
          <Link to="/register" className="btn btn-book-now">Book your Doctor</Link>
        </div>
        <div className="hero-image">
          <img src="/bg.jpg" alt="Doctor Symbol" />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;