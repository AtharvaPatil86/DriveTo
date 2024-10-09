import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CarRental.css'; // Add your custom CSS here

const CarRental = () => {
  const navigate = useNavigate();

  return (
    <div className="car-rental-container">
      <h1>Choose Your Ride</h1>
      <div className="options-container">
        <div className="option-box regular" onClick={() => navigate('/regular')}>
          <h2>Regular</h2>
        </div>
        <div className="option-box luxury" onClick={() => navigate('/luxury')}>
          <h2>Luxury</h2>
        </div>
      </div>
    </div>
  );
};

export default CarRental;
