import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const RegisterCar = () => {
  const [car, setCar] = useState({
    name: '',
    model: '',
    numberPlate: '',
    insuranceNumber: '',
    year: '',
    category: '',
    status: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/cars', car, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Car registered successfully!');
        // Reset form fields after successful registration
        setCar({
          name: '',
          model: '',
          numberPlate: '',
          insuranceNumber: '',
          year: '',
          category: '',
          status: false,
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
      <h2>Register a New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Car Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={car.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            className="form-control"
            id="model"
            name="model"
            value={car.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberPlate">Number Plate:</label>
          <input
            type="text"
            className="form-control"
            id="numberPlate"
            name="numberPlate"
            value={car.numberPlate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="insuranceNumber">Insurance Number:</label>
          <input
            type="text"
            className="form-control"
            id="insuranceNumber"
            name="insuranceNumber"
            value={car.insuranceNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            className="form-control"
            id="year"
            name="year"
            value={car.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={car.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="mini">Mini</option>
            <option value="sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <button type="submit" className="btn btn-dark" style={{ width: '170px' }}>
          Register Car
        </button>
      </form>
    </div>
  );
};

export default RegisterCar;
