import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

export default function Options() {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div>
      <div className="row mt-5 algn">
        <div className="col-md-3">
          <div 
            className="box card shadow-lg" 
            style={{ transition: 'transform 4s', cursor: 'pointer' }}
            onClick={() => handleNavigation('/cab')}  // Navigate to Cab page
          >
            <div className="card-body algn">
              <h3>Cab</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="box card shadow-lg" 
            style={{ transition: 'transform 4s', cursor: 'pointer' }}
            onClick={() => handleNavigation('/rentacar')}  // Navigate to Rent a Car page
          >
            <div className="card-body algn">
              <h3>Rent a Car</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="box card shadow-lg" 
            style={{ transition: 'transform 4s', cursor: 'pointer' }}
            onClick={() => handleNavigation('/transport')}  // Navigate to Transport page
          >
            <div className="card-body algn">
              <h3>Transport</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}