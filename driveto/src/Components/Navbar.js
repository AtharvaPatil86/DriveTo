import React from 'react';
import { NavLink } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4 navy">
        <div className="container-fluid">
          
          <ul className="navbar-nav me-auto">
            <li className="nav-item mx-3">
              <NavLink
                className="nav-link"
                to="/"
                end // This ensures the Home link is only active on the root path "/"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                  
                })}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink
                className="nav-link"
                to="/about"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                  
                })}
              >
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
                  <NavLink
                    className="dropdown-item"
                    to="/driver"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 'bold' : 'normal',
                      
                    })}
                  >
                    Driver
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/rent-your-car"
                    style={({ isActive }) => ({
                      fontWeight: isActive ? 'bold' : 'normal',
                      
                    })}
                  >
                    Rent Your Car
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          {/* Right-aligned nav items */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/login"
                style={({ isActive }) => ({
                  fontWeight: isActive ? 'bold' : 'normal',
                  
                })}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
