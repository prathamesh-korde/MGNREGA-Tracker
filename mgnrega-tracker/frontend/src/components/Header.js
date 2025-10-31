import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaInfo } from 'react-icons/fa';
import './Header.css';

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>
            <span className="logo-icon">🏗️</span>
            <span className="logo-text">
              <span className="hindi-text">मनरेगा ट्रैकर</span>
              <span className="english-text">MGNREGA Tracker</span>
            </span>
          </h1>
        </Link>
        <nav className="nav-links">
          <Link to="/about" className="nav-link">
            <FaInfo /> <span>जानकारी / About</span>
          </Link>
          <button onClick={toggleDarkMode} className="theme-toggle" aria-label="Toggle dark mode">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
