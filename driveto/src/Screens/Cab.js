import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Cab.css';
import CarTypes from '../Components/CarTypes';
import LocationForm from '../Components/LocationForm'; // Import the LocationForm

export default function Cab({ pickUpLocation, dropOffLocation, startDate, endDate }) {
  const [submittedData, setSubmittedData] = useState(null); // Store submitted booking info
  const [selectedCar, setSelectedCar] = useState(null); // Store selected car type
  const navigate = useNavigate(); // Initialize the navigate function
      console.log('Submitting data:', submittedData);
      console.log('Selected car:', selectedCar);
  const handleFormSubmit = (formData) => {
    setSubmittedData(formData); // Save form data to display after form submission
  };

  // Function to handle car selection
  const handleCarSelect = (car) => {
    setSelectedCar(car); // Save the selected car
  };

  return (
    <div className="container1 mt-5">
      <div className="left-side1">
        <LocationForm
          pickUpLocation={pickUpLocation}
          dropOffLocation={dropOffLocation}
          startDate={startDate}
          endDate={endDate}
          onSubmit={handleFormSubmit} // Pass the form submission handler
          selectedCar={selectedCar} // Pass the selected car
        />
      </div>

      <CarTypes onSelectCar={handleCarSelect} /> {/* Pass car selection handler */}
    </div>
  );
}
