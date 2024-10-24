import React, { useState } from 'react';
import axios from 'axios';

export default function Work_Us() {
  const [driver, setDriver] = useState({
    name: '',
    licenseNumber: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    rating: 0,
  });

  const [loading, setLoading] = useState(false); // Loading state to handle submission
  const [errors, setErrors] = useState({}); // To store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver({
      ...driver,
      [name]: value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!driver.name) newErrors.name = "Name is required.";
    if (!driver.licenseNumber) newErrors.licenseNumber = "License number is required.";
    if (!driver.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!/^\d+$/.test(driver.phoneNumber)) newErrors.phoneNumber = "Phone number must contain only digits.";
    if (!driver.email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(driver.email)) newErrors.email = "Invalid email format.";
    if (!driver.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Start loading
    setErrors({}); // Clear previous errors

    try {
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
      console.error('Error:', error.response?.data || error.message);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
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
          {errors.name && <small className="text-danger">{errors.name}</small>}
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
          {errors.licenseNumber && <small className="text-danger">{errors.licenseNumber}</small>}
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
          {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
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
          {errors.email && <small className="text-danger">{errors.email}</small>}
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
          {errors.dateOfBirth && <small className="text-danger">{errors.dateOfBirth}</small>}
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
        <button type="submit" className="btn btn-dark" style={{ width: '170px' }} disabled={loading}>
          {loading ? 'Creating...' : 'Create Driver'}
        </button>
      </form>
    </div>
  );
}
