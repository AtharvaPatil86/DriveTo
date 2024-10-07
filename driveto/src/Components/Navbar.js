import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';

import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // Check token expiration (assuming 'exp' is present in token)
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
        } else {
          localStorage.removeItem('token'); // Clear expired token
        }
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Use navigate for redirection
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4 navy">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto">
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/Booking" end>
                Ur bookings
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown mx-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="workDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Work With Us
              </a>
              <ul className="dropdown-menu" aria-labelledby="workDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/driver">
                    Driver
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/rent-your-car">
                    Rent Your Car
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          {/* Right-aligned nav items */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {user.name}!</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
