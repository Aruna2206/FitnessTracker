// components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    // In a real app, you would check localStorage, cookies, or a state management solution
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userInfo));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUser(null);
    setProfileDropdownOpen(false);
    // Redirect to home page
    navigate("/");
    // Close mobile menu if open
    setMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <span className="logo-icon">
              <i className="fas fa-dumbbell"></i>
            </span>
            <span className="logo-text">FitTracker</span>
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          {isLoggedIn ? (
            // Menu items for logged-in users
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/logworkout" onClick={() => setMenuOpen(false)}>
                Log Workout
              </Link>
              <Link to="/goals" onClick={() => setMenuOpen(false)}>
                Goals
              </Link>

              {/* User profile dropdown - desktop */}
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <button
                  className="profile-dropdown-toggle"
                  onClick={toggleProfileDropdown}
                >
                  <img
                    src={
                      user?.profileImage ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="Profile"
                    className="profile-image"
                  />
                  <span className="profile-name">{user?.name || "User"}</span>
                  <i
                    className={`fas fa-chevron-${
                      profileDropdownOpen ? "up" : "down"
                    }`}
                  ></i>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown-menu">
                    <Link
                      to="/profile"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      <i className="fas fa-user"></i> My Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      <i className="fas fa-cog"></i> Settings
                    </Link>
                    <button onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile-only logout button */}
              <button className="nav-logout mobile-only" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            // Menu items for guests
            <>
              <Link to="/features" onClick={() => setMenuOpen(false)}>
                Features
              </Link>
              <Link to="/pricing" onClick={() => setMenuOpen(false)}>
                Pricing
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="nav-login"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="nav-register"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
