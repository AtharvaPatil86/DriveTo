import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LocationForm.css';

export default function LocationForm({ pickUpLocation, dropOffLocation, startDate, endDate, onSubmit, selectedCar }) {
  const [formData, setFormData] = useState({
    pickUpLocation: pickUpLocation || '',
    dropOffLocation: dropOffLocation || '',
    startDate: startDate || '',
    endDate: endDate || '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit function passed from the Cab component

    // Navigate to the Book page with the submitted form data and selected car
    navigate('/book', {
      state: {
        car: selectedCar, // Pass the selected car from props
        bookingDetails: formData, // Pass form data
      },
    }); // Adjust this path if needed
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-lg p-4 booking-form">
      <div className="form-group">
        <label>Pick-up Location</label>
        <input
          type="text"
          className="form-control"
          name="pickUpLocation"
          value={formData.pickUpLocation}
          onChange={handleChange}
          placeholder="Enter Pick-up Location"
          required
        />
      </div>

      <div className="form-group">
        <label>Drop-off Location</label>
        <input
          type="text"
          className="form-control"
          name="dropOffLocation"
          value={formData.dropOffLocation}
          onChange={handleChange}
          placeholder="Enter Drop-off Location"
          required
        />
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          className="form-control"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          className="form-control"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-dark">Search</button>
    </form>
  );
}
