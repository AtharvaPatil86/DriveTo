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
    <div className="container mt-5">
      <div className="left-side">
        <LocationForm
          pickUpLocation={pickUpLocation}
          dropOffLocation={dropOffLocation}
          startDate={startDate}
          endDate={endDate}
          onSubmit={handleFormSubmit}  // Pass the form submission handler
        />
      </div>

      {/* Conditionally display booking info after form submission */}
      {submittedData && (
        <div className="mt-5">
          <h3 className="text-center">Booking Details</h3>
          <div className="card p-4">
            <p><strong>Pick-up Location:</strong> {submittedData.pickUpLocation}</p>
            <p><strong>Drop-off Location:</strong> {submittedData.dropOffLocation}</p>
            <p><strong>Start Date:</strong> {submittedData.startDate}</p>
            <p><strong>End Date:</strong> {submittedData.endDate}</p>
          </div>
        </div>
      )}

      <CarTypes />  {/* Display Car Types */}
    </div>
  );
}
