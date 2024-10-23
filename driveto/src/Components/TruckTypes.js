import React, { useState } from 'react';
import './TruckTypes.css'; // Importing the CSS for styling
import threewheel from '../Images/threewheel.jpg';
import mahindra from '../Images/mahindraTruck.webp';
import Ashok from '../Images/Ashok.webp';

export default function TruckTypes({ onSelectTruck }) {
  const tempTrucks = [
    {
      name: 'Three-Wheeler',
      company: 'Tata',
      transmission: 'Manual',
      fuelType: 'Diesel',
      capacity: 3,
      insurance: 'Basic',
      price: 800,
      image: `${threewheel}`
    },
    {
      name: 'Four-Wheeler Medium',
      company: 'Mahindra',
      transmission: 'Manual',
      fuelType: 'Diesel',
      capacity: 5,
      insurance: 'Comprehensive',
      price: 1200,
      image: `${mahindra}`
    },
    {
      name: 'Huge Truck',
      company: 'Ashok Leyland',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      capacity: 10,
      insurance: 'Comprehensive',
      price: 2000,
      image: `${Ashok}`
    },
  ];

  const [selectedTruckIndex, setSelectedTruckIndex] = useState(null);

  const handleTruckClick = (index) => {
    setSelectedTruckIndex(index);
    onSelectTruck(tempTrucks[index]); // Pass the selected truck's data as input
  };

  return (
    <div className="truck-types-container2">
      {tempTrucks.map((truck, index) => (
        <div
          className={`truck-box2 shadow-lg ${selectedTruckIndex === index ? 'selected' : ''}`}
          key={index}
          onClick={() => handleTruckClick(index)} // Handle truck click
        >
          <img src={truck.image} alt={`${truck.name}`} className="truck-image2" />
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
