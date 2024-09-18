import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

export default function Options() {
  return (
      <div>
       <div className="row mt-5 algn">
        <div className="col-md-3">
          <div className="box card shadow-lg" style={{ transition: 'transform 4s', cursor: 'pointer' }}>
            <div className="card-body algn">
              <h3>Cab</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box card shadow-lg" style={{ transition: 'transform 4s', cursor: 'pointer' }}>
            <div className="card-body algn">
              <h3>Rent a Car</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box card shadow-lg" style={{ transition: 'transform 4s', cursor: 'pointer' }}>
            <div className="card-body algn">
              <h3>Transport</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
