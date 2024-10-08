import React, { useState } from 'react';
import './CarTypes.css'; // Importing the CSS for styling
import mini from '../Images/mini.webp';
import sedan from '../Images/sedan.webp';
import suv from '../Images/suv.webp';

export default function CarTypes({ onSelectCar }) { // Add onSelectCar prop
  // Sample data for car types
  const tempCars = [
    { image: `${mini}`, name: 'Mini', capacity: 4 },
    { image: `${sedan}`, name: 'Sedan', capacity: 5 },
    { image: `${suv}`, name: 'SUV', capacity: 7 },
  ];

  // State to track the selected car
  const [selectedCarIndex, setSelectedCarIndex] = useState(null);

  // Function to handle click on car box
  const handleCarClick = (index) => {
    setSelectedCarIndex(index);
    onSelectCar(tempCars[index]); // Call the onSelectCar function with the selected car's details
  };

  return (
    <div className="car-types-container">
      {tempCars.map((car, index) => (
        <div
          className={`car-box shadow-lg ${
            selectedCarIndex === index ? 'selected' : ''
          }`} 
          key={index}
          onClick={() => handleCarClick(index)}
        >
          <img src={car.image} alt={`${car.name}`} className="car-image" />
          <div className="details">
            <h1 className="car-name">{car.name}</h1>
            <p><strong>Capacity:</strong> {car.capacity} people</p>
          </div>
        </div>
      ))}
    </div>
  );
}
