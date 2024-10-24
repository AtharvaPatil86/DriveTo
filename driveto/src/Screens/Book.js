import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Book.css'; // Import your custom CSS for styling
import axios from 'axios'; // Make sure to install axios if you haven't already
import Map from '../Components/map'; // Import the Map component

// Function to convert locations to coordinates using a geocoding API
const getCoordinates = async (location) => {
  const apiKey = '53cdbaad17174f8fbd6c7a87af00e1cd'; // Replace with your API key
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`);
  
  if (response.data.results.length > 0) {
    const { lat, lng } = response.data.results[0].geometry;
    return { lat, lng };
  } else {
    throw new Error('Location not found');
  }
};

export default function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for confirmation dialog
  const [isConfirming, setIsConfirming] = useState(false);

  const defaultBookingDetails = {
    pickUpLocation: 'New York City',
    dropOffLocation: 'Los Angeles',
    startDate: '2024-10-10',
    endDate: '2024-10-20'
  };

  // Retrieve car data passed through navigation state
  const car = location.state?.car || {
    name: 'Default Car Model',
    imgSrc: 'https://via.placeholder.com/400x200?text=Car+Image',
    capacity: 5,
    baseRate: 100 // Base rate per day (you can customize this)
  };
  
  const bookingDetails = location.state?.bookingDetails || defaultBookingDetails;

  // State to store coordinates for the map
  const [startCoordinates, setStartCoordinates] = useState({ lat: 40.7128, lng: -74.0060 }); // Default: NYC
  const [endCoordinates, setEndCoordinates] = useState({ lat: 34.0522, lng: -118.2437 }); // Default: LA

  // Fetch coordinates when the component mounts or when booking details change
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const startLoc = await getCoordinates(bookingDetails.pickUpLocation);
        const endLoc = await getCoordinates(bookingDetails.dropOffLocation);

        setStartCoordinates(startLoc);
        setEndCoordinates(endLoc);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [bookingDetails.pickUpLocation, bookingDetails.dropOffLocation]);

  // Calculate total cost based on rental duration
  const calculateTotalCost = () => {
    const startDate = new Date(bookingDetails.startDate);
    const endDate = new Date(bookingDetails.endDate);
    
    // Check if the dates are valid
    if (isNaN(startDate) || isNaN(endDate)) {
      console.error('Invalid dates:', bookingDetails.startDate, bookingDetails.endDate);
      return 0;
    }
    
    const rentalDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)); // Use Math.ceil for rounding up rental days
    
    const totalCost = rentalDays * car.baseRate; // Calculate total cost

    return totalCost > 0 ? totalCost : 0; // Ensure cost is non-negative
  };

  // Handle booking confirmation
  const handleBook = () => {
    setIsConfirming(true);
  };

  // Confirm booking and redirect to payment page
  const confirmBooking = () => {
    const amountToPay = calculateTotalCost(); // Calculate the total cost dynamically
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
          <img src={car.imgSrc} alt={`${car.name}`} className="car-image1" />
          <p><strong>Capacity:</strong> {car.capacity} people</p>
        </div>

        {/* Booking Details */}
        <div className="booking-info">
          <h2>Booking Details</h2>
          <p><strong>Pick-up Location:</strong> {bookingDetails.pickUpLocation}</p>
          <p><strong>Drop-off Location:</strong> {bookingDetails.dropOffLocation}</p>
          <p><strong>Start Date:</strong> {bookingDetails.startDate}</p>
          <p><strong>End Date:</strong> {bookingDetails.endDate}</p>
          <p><strong>Total Cost:</strong> ₹{calculateTotalCost()}</p> {/* Display the total cost */}
        </div>

        {/* Map Integration */}
        <div className="map-container">
          <Map 
            startLocation={startCoordinates} 
            endLocation={endCoordinates} 
          />
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
