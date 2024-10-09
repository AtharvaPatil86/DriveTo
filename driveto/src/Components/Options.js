import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Assume this contains custom styling
import { useNavigate } from 'react-router-dom';

// You can replace these images with your actual image URLs or imports
import cabImage from '../Images/cab.jpg'; // Example image path
import rentCarImage from '../Images/rent_car.jpg'; // Example image path
import transportImage from '../Images/transport.webp'; // Example image path

export default function Options() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div
            className="box card shadow-lg"
            style={{ cursor: 'pointer', height: '350px' }}
            onClick={() => handleNavigation('/cab')}
          >
            <img
              src={cabImage}
              alt="Cab"
              className="card-img-top"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h3>Cab</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div
            className="box card shadow-lg"
            style={{ cursor: 'pointer', height: '350px' }}
            onClick={() => handleNavigation('/rentacar')}
          >
            <img
              src={rentCarImage}
              alt="Rent a Car"
              className="card-img-top"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h3>Rent a Car</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div
            className="box card shadow-lg"
            style={{ cursor: 'pointer', height: '350px' }}
            onClick={() => handleNavigation('/transport')}
          >
            <img
              src={transportImage}
              alt="Transport"
              className="card-img-top"
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h3>Transport</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
