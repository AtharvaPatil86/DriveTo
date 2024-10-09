import React, { useState } from 'react';
import TruckTypes from '../Components/TruckTypes'; // Import TruckTypes
import LocationForm from '../Components/LocationForm'; // Import LocationForm
import './Transport.css'; // Import the CSS file

export default function Transport({ pickUpLocation, dropOffLocation, startDate, endDate }) {
  const [submittedData, setSubmittedData] = useState(null); // Store submitted booking info
  const [selectedTruck, setSelectedTruck] = useState(null); // Store selected truck type

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData); // Save form data to display after form submission
  };

  // Function to handle truck selection
  const handleTruckSelect = (truck) => {
    setSelectedTruck(truck); // Save the selected truck
  };

  return (
    <div className="container2 mt-5">
      <div className="left-side">
        <LocationForm
          pickUpLocation={pickUpLocation}
          dropOffLocation={dropOffLocation}
          startDate={startDate}
          endDate={endDate}
          onSubmit={handleFormSubmit} // Pass the form submission handler
          selectedCar={selectedTruck} // Pass the selected truck to LocationForm as input
        />
      </div>

      <TruckTypes onSelectTruck={handleTruckSelect} /> {/* Pass truck selection handler */}
    </div>
  );
}
