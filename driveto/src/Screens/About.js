import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import about1 from '../Images/about1.jpg'

export default function About() {
  return (
    <div className="container mt-5">
      
      <div className="text-center mb-5">
        <h1 className="display-4">About DriveTo</h1>
        <p className="lead">Your trusted partner for safe and reliable cab, car rentals and transportation services.</p>
      </div>

      
      <div className="row mb-5">
        <div className="col-md-6">
          <img 
            src={about1}
            alt="DriveTo" 
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h2>What is DriveTo</h2>
            <p>
              DriveTo is a platform for cab, car rental and transportation services. We are a team of prefessional drivers and have a collection of well maintained vehicles to ensure that your journey is comfortable, convenient and safe. Whether you are looking for a cab, to rent a car or finding a transport vehicle DriveTo has you covered.
            </p>
          </div>
        </div>
      </div>

      
      <div className="row text-center bg-light py-5 mb-5">
        <div className="col">
          <h2>Our Aim</h2>
          <p className="lead">
            To provide reliable, efficient, and affordable cab, car rental and transportation services while ensuring the
            safety and comfort of our clients.
          </p>
        </div>
      </div>

      
      <div className="row mb-5">
        <div className="col text-center">
          <h2>What We Offer</h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Car Rentals</h5>
              <p className="card-text">
                Choose from a variety of vehicles that suit your needs from compact vehicles for everyday needs to luxury vehicles for special occasions or events.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Professional Drivers</h5>
              <p className="card-text">
                Our experienced drivers ensure that you reach your destination safely and on time.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Flexible Plans</h5>
              <p className="card-text">
                We offer flexible rental and transportation plans tailored to your unique needs and budget.
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row mt-5 text-center">
        <div className="col">
          <h2>Meet Our Team</h2>
          <p>Our dedicated team is here to provide you with the best service possible.</p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-3">
          <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-circle mb-3" />
          <h5>John Doe</h5>
          <p>CEO & Founder</p>
        </div>
        <div className="col-md-3">
          <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-circle mb-3" />
          <h5>Jane Smith</h5>
          <p>Head of Operations</p>
        </div>
        <div className="col-md-3">
          <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-circle mb-3" />
          <h5>Michael Brown</h5>
          <p>Lead Driver</p>
        </div>
        <div className="col-md-3">
          <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-circle mb-3" />
          <h5>Sarah Wilson</h5>
          <p>Customer Support Manager</p>
        </div>
      </div>
    </div>
  );
}