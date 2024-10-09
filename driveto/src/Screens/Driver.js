import React, { useState } from 'react';
import axios from 'axios'; // You already imported axios, so let's use it

export default function Work_Us() {
  const [driver, setDriver] = useState({
    name: '',
    licenseNumber: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver({
      ...driver,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Using axios to send the POST request
      const response = await axios.post('http://localhost:5000/api/drivers', driver, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Driver created successfully!');
        setDriver({
          name: '',
          licenseNumber: '',
          phoneNumber: '',
          email: '',
          dateOfBirth: '',
          rating: 0,
        });
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={driver.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="licenseNumber">License Number:</label>
          <input
            type="text"
            className="form-control"
            id="licenseNumber"
            name="licenseNumber"
            value={driver.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={driver.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={driver.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={driver.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (0 to 5):</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            name="rating"
            value={driver.rating}
            min="0"
            max="5"
            step="0.1"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-dark" style={{ width: '170px' }}>
          Create Driver
        </button>
      </form>
    </div>
  );
}
