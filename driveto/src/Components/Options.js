import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Options() {
  return (
      <div>
       <div className="row mt-5">
        <div className="col-md-4">
          <div className="box card shadow-lg" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div className="card-body">
              <h3>Cab</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box card shadow-lg" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div className="card-body">
              <h3>Rent a Car</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box card shadow-lg" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div className="card-body">
              <h3>Transport</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
