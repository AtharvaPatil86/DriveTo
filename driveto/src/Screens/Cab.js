import React, { useState } from 'react';
import './Cab.css';
import CarTypes from '../Components/CarTypes';
import LocationForm from '../Components/LocationForm'; // Import the LocationForm

export default function Cab({ pickUpLocation, dropOffLocation, startDate, endDate }) {
  const [submittedData, setSubmittedData] = useState(null);  // Store submitted booking info

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);  // Save form data to display after form submission
  };

  return (
    <div className="container1 mt-5">
      <div className="left-side">
        <LocationForm
          pickUpLocation={pickUpLocation}
          dropOffLocation={dropOffLocation}
          startDate={startDate}
          endDate={endDate}
          onSubmit={handleFormSubmit}  // Pass the form submission handler
        />
      </div>

      <CarTypes />  {/* Display Car Types */}
    </div>
  );
}
