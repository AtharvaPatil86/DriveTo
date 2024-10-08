import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Previous_Bookings.css';

export default function Previous_Booking() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            token: 'your_jwt_token_here', // Replace with the actual token
          },
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch bookings');
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="previous-bookings-container">
      <h1 className="title">Previous Bookings</h1>
      {error && <p className="error-message">{error}</p>}
      {bookings.length === 0 ? (
        <p>No previous bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} className="booking-box shadow-lg">
            <h2 className="car-name">{booking.car.name}</h2>
            <p><strong>Pick-up Location:</strong> {booking.pickUpLocation}</p>
            <p><strong>Drop-off Location:</strong> {booking.dropOffLocation}</p>
            <p><strong>Start Date:</strong> {new Date(booking.rentalStartDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(booking.rentalEndDate).toLocaleDateString()}</p>
            <p><strong>Total Cost:</strong> {booking.totalCost}</p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
