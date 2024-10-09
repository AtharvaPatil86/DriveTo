import React, { useState } from 'react';
import axios from 'axios';
//having errors in submission of text also err in server 500
export const RegisterCar = () => {
  const [formData, setFormData] = useState({
    make: '',
    type: '', // Initialized as an empty string
    truckCategory: '', // Only needed if type is 'Truck'
    model: '',
    year: '',
    numberplate: '',
    insuranceNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/cars', formData);
      console.log('Car registered successfully:', response.data); // Make sure response has data
    } catch (error) {
      // Add checks for both `error` and `error.response`
      if (error.response) {
        console.error('Error registering car:', error.response.data); // Check if error.response exists
      } else {
        console.error('Error registering car:', error.message); // Fallback to error.message
      }
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Register Your Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="make">Make:</label>
          <input
            type="text"
            className="form-control"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            className="form-control"
            id="type"
            name="type"
            value={formData.type} // Ensure the value is correctly tracked
            onChange={handleChange}
            required
          >
            <option value="">Select Car Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Mini">Mini</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        {formData.type === 'Truck' && (
          <div className="form-group">
            <label htmlFor="truckCategory">Truck Category:</label>
            <select
              className="form-control"
              id="truckCategory"
              name="truckCategory"
              value={formData.truckCategory}
              onChange={handleChange}
              required={formData.type === 'Truck'}
            >
              <option value="">Select Truck Category</option>
              <option value="Mini">Mini</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            className="form-control"
            id="model"
            name="model"
            value={formData.model}
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
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberplate">Number Plate:</label>
          <input
            type="text"
            className="form-control"
            id="numberplate"
            name="numberplate"
            value={formData.numberplate}
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
            value={formData.insuranceNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Register Car
        </button>
      </form>
    </div>
  );
};
