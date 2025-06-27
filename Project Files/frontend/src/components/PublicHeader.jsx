import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PublicHeader.css';

const PublicHeader = () => {
  return (
    <header className="public-header">
      <div className="public-logo">MediCareBook</div>
      <nav className="public-nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default PublicHeader;