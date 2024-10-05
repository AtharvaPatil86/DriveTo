import React from 'react';
import './CarTypes.css'; // Importing the CSS for styling

export default function CarTypes() {
  // Sample data for car types
  const tempCars = [
    {
      name: 'Sedan',
      company: 'Toyota',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      capacity: 5,
      insurance: 'Comprehensive',
      price: 5000,
    },
    {
      name: 'Mini',
      company: 'Suzuki',
      transmission: 'Manual',
      fuelType: 'CNG',
      capacity: 4,
      insurance: 'Basic',
      price: 3000,
    },
    {
      name: 'SUV',
      company: 'Ford',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      capacity: 7,
      insurance: 'Comprehensive',
      price: 8000,
    },
    {
      name: 'Hatchback',
      company: 'Hyundai',
      transmission: 'Manual',
      fuelType: 'Petrol',
      capacity: 5,
      insurance: 'Basic',
      price: 4000,
    },
    {
      name: 'Luxury',
      company: 'BMW',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      capacity: 5,
      insurance: 'Premium',
      price: 15000,
    },
  ];

  return (
    <div className="car-types-container">
      {tempCars.map((car, index) => (
        <div className="car-box shadow-lg" key={index}>
          <img src={car.image} alt={`${car.name}`} className="car-image" />
          <div className="details">
            <h3 className="car-name">{car.name} - {car.company}</h3>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Fuel Type:</strong> {car.fuelType}</p>
            <p><strong>Capacity:</strong> {car.capacity} people</p>
            <p><strong>Insurance:</strong> {car.insurance}</p>
            <div className="price-bottom-left">
              <strong>Price:</strong> ₹{car.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
