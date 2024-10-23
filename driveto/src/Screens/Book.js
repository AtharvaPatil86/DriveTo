import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Book.css'; // Import your custom CSS for styling
import axios from 'axios'; // Make sure to install axios if you haven't already

export default function Book() {
  
  const location = useLocation();
  console.log('Received booking data:', location.state); // for console log
  const navigate = useNavigate();
  
  // State for confirmation dialog
  const [isConfirming, setIsConfirming] = useState(false);

  const defaultCar = {
    name: 'Default Car Model',
    image: 'https://via.placeholder.com/400x200?text=Car+Image',
    capacity: 5
  };
  
  const defaultBookingDetails = {
    pickUpLocation: 'New York City',
    dropOffLocation: 'Los Angeles',
    startDate: '2024-10-10',
    endDate: '2024-10-20'
  };

  const car = location.state?.car || defaultCar;
  const bookingDetails = location.state?.bookingDetails || defaultBookingDetails;

  // Handle booking confirmation
  const handleBook = () => {
    setIsConfirming(true);
    const amountToPay = 100; // Replace with actual logic to calculate total cost
    navigate('/payment', {
      state: {
        bookingDetails: {
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
          pickUpLocation: bookingDetails.pickUpLocation,
          dropOffLocation: bookingDetails.dropOffLocation
        },
        amount: amountToPay
      }
    });
  };

  // Confirm booking
  const confirmBooking = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
  
      if (!token) {
        alert('Token not found. Please login again.');
        navigate('/login'); // Redirect to login if no token found
        return;
      }
  
      const bookingData = {
        token,
        car: car.name,
        rentalStartDate: bookingDetails.startDate,
        rentalEndDate: bookingDetails.endDate,
        totalCost: 100 // Replace with actual cost calculation logic
      };
  
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
  
      if (response.status === 201) {
        alert('Car booked successfully!');
        navigate('/Booking'); // Change to your desired route
      } else {
        throw new Error('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error occurred while booking the car. Please try again.');
    } finally {
      setIsConfirming(false); // Close confirmation dialog
    }
  };
  
  // Cancel booking
  const cancelBooking = () => {
    setIsConfirming(false);
  };

  return (
    <div className="book-page">
      <div className="booking-box">
        <h1>Car Booking Summary</h1>

        {/* Car Information */}
        <div className="car-info">
          <h2>{car.name}</h2>
          <img src={car.image} alt={`${car.name}`} className="car-image1" />
          <p><strong>Capacity:</strong> {car.capacity} people</p>
        </div>

        {/* Booking Details */}
        <div className="booking-info">
          <h2>Booking Details</h2>
          <p><strong>Pick-up Location:</strong> {bookingDetails.pickUpLocation}</p>
          <p><strong>Drop-off Location:</strong> {bookingDetails.dropOffLocation}</p>
          <p><strong>Start Date:</strong> {bookingDetails.startDate}</p>
          <p><strong>End Date:</strong> {bookingDetails.endDate}</p>
        </div>

        {/* Book Button */}
        <button className="btn btn-dark book-btn" onClick={handleBook}>Proceed to Payment</button>

        {/* Confirmation Dialog */}
        {isConfirming && (
          <div className="confirmation-dialog">
            <h3>Confirm Booking</h3>
            <p>Are you sure you want to book the {car.name}?</p>
            <button className="btn btn-success" onClick={confirmBooking}>Yes</button>
            <button className="btn btn-danger" onClick={cancelBooking}>No</button>
          </div>
        )}
      </div>
    </div>
  );
}
