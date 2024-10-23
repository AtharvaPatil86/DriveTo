import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css'; // Import CSS for styling
import Payment from '../Images/payment.png';

const PaymentPage = () => {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [amount, setAmount] = useState(0);

  // Fetching the data from Book.js using location state
  useEffect(() => {
    if (location.state) {
      setBookingDetails(location.state.bookingDetails); // Get booking details from Book.js
      setAmount(location.state.amount); // Get the amount from Book.js
    }
  }, [location]);

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment Details</h2>
        {bookingDetails ? (
          <div className="booking-info">
            <h3>Booking Information</h3>
            <p><strong>Pick-up Location:</strong> {bookingDetails.pickUpLocation || 'N/A'}</p>
            <p><strong>Drop-off Location:</strong> {bookingDetails.dropOffLocation || 'N/A'}</p>
            <p><strong>Start Date:</strong> {bookingDetails.startDate || 'N/A'}</p>
            <p><strong>End Date:</strong> {bookingDetails.endDate || 'N/A'}</p>
          </div>
        ) : (
          <p>Loading booking details...</p>
        )}
        <div className="amount-info">
          <h3>Total Amount to Pay: ₹{amount}</h3>
        </div>
        <div className="upi-section">
          <h3>Scan UPI to Pay</h3>
          <img src={Payment} alt="UPI Scanner" className="upi-scanner"/>
          <p>Scan the QR code with any UPI app to complete the payment.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
