import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4">
        <div className="container-fluid">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="workDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Work With Us
              </a>
              <ul className="dropdown-menu" aria-labelledby="workDropdown">
                <li><a className="dropdown-item" href="#">Driver</a></li>
                <li><a className="dropdown-item" href="#">Rent Your Car</a></li>
              </ul>
            </li>
            <li className="nav-item ms-auto">
              <a className="nav-link" href="#">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
