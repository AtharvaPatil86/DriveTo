import React from 'react';
import './Previous_Bookings.css';

export default function Previous_Booking() {
  // Default booking data for visualization
  const bookings = [
    {
      carName: 'Toyota Camry',
      pickUpLocation: 'Downtown',
      dropOffLocation: 'Airport',
      startDate: '2024-09-15',
      endDate: '2024-09-18',
      totalCost: '$120',
      status: 'Completed',
    },
    {
      carName: 'Honda Civic',
      pickUpLocation: 'City Center',
      dropOffLocation: 'Beachside',
      startDate: '2024-10-01',
      endDate: '2024-10-03',
      totalCost: '$90',
      status: 'Cancelled',
    },
    {
      carName: 'Ford Explorer',
      pickUpLocation: 'Train Station',
      dropOffLocation: 'University',
      startDate: '2024-10-05',
      endDate: '2024-10-07',
      totalCost: '$150',
      status: 'In-progress',
    },
  ];

  return (
    <div className="previous-bookings-container">
      <h1 className="title">Previous Bookings</h1>
      {bookings.map((booking, index) => (
        <div key={index} className="booking-box shadow-lg">
          <h2 className="car-name">{booking.carName}</h2>
          <p><strong>Pick-up Location:</strong> {booking.pickUpLocation}</p>
          <p><strong>Drop-off Location:</strong> {booking.dropOffLocation}</p>
          <p><strong>Start Date:</strong> {booking.startDate}</p>
          <p><strong>End Date:</strong> {booking.endDate}</p>
          <p><strong>Total Cost:</strong> {booking.totalCost}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
