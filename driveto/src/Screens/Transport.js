import React, { useState } from 'react';
import LocationForm from '../Components/LocationForm'; // Import the LocationForm
import TruckTypes from '../Components/TruckTypes'; // Import the TruckTypes component

const Transport = () => {
  // Define the state for form data
  const [formData, setFormData] = useState({
    pickUpLocation: '',
    dropOffLocation: '',
    startDate: '',
    endDate: ''
  });

  // Handle form submission from LocationForm component
  const handleFormSubmit = (data) => {
    setFormData(data); // Store the form data in state
    console.log('Form submitted:', data);
  };

  return (
    <div className="container mt-5">
      <div className="left-side">
        {/* Pass down state variables and the form submission handler */}
        <LocationForm
          pickUpLocation={formData.pickUpLocation}
          dropOffLocation={formData.dropOffLocation}
          startDate={formData.startDate}
          endDate={formData.endDate}
          onSubmit={handleFormSubmit}
        />
      </div>

      {/* Display truck types next to the form */}
      <TruckTypes />
    </div>
  );
};

export default Transport;
