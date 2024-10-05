import React, { useEffect, useState } from 'react';
import './TruckTypes.css'; // Importing the CSS for styling
import axios from 'axios'; // Assuming you're using Axios

export default function TruckTypes() {
  const [trucks, setTrucks] = useState([]);

  // Fetch truck data from backend (or you can use hardcoded data for now)
  useEffect(() => {
    axios.get('/api/trucks')  // Replace with your backend route
      .then(response => {
        setTrucks(response.data);
      })
      .catch(error => {
        console.error('Error fetching truck data:', error);
      });
  }, []);

  // Temporary data for testing
  const tempTrucks = [
    {
      name: 'Three-Wheeler',
      company: 'Tata',
      transmission: 'Manual',
      fuelType: 'Diesel',
      capacity: 3,
      insurance: 'Basic',
      price: 800,
      image: 'https://via.placeholder.com/150' // Replace with your actual image URL
    },
    {
      name: 'Four-Wheeler Medium',
      company: 'Mahindra',
      transmission: 'Manual',
      fuelType: 'Diesel',
      capacity: 5,
      insurance: 'Comprehensive',
      price: 1200,
      image: 'https://via.placeholder.com/150' // Replace with your actual image URL
    },
    {
      name: 'Huge Truck',
      company: 'Ashok Leyland',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      capacity: 10,
      insurance: 'Comprehensive',
      price: 2000,
      image: 'https://via.placeholder.com/150' // Replace with your actual image URL
    },
  ];

  return (
    <div className="truck-types-container">
      {tempTrucks.map((truck, index) => (
        <div className="truck-box shadow-lg" key={index}>
          <img src={truck.image} alt={`${truck.name}`} className="truck-image" />
          <div className="details">
            <h3 className="truck-name">{truck.name} - {truck.company}</h3>
            <p><strong>Transmission:</strong> {truck.transmission}</p>
            <p><strong>Fuel Type:</strong> {truck.fuelType}</p>
            <p><strong>Capacity:</strong> {truck.capacity} people</p>
            <p><strong>Insurance:</strong> {truck.insurance}</p>
            <div className="price-bottom-left">
              <strong>Price:</strong> ₹{truck.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
