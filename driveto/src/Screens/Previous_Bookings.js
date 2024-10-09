import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreviousBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token'); // Get the token from localStorage

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token) {
                setError('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:5000/api/bookings/fetch', {
                    token: token, // Include the token in the body
                });

                setBookings(response.data); // Set the bookings data
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError(err.response ? err.response.data.error : 'An error occurred');
            }
        };

        fetchBookings(); // Call the fetch function
    }, [token]);

    return (
        <div>
            <h2>Previous Bookings</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <ul>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <li key={booking._id}>
                            <strong>Car:</strong> {booking.car.name} <br />
                            <strong>Start:</strong> {new Date(booking.rentalStartDate).toLocaleString()} <br />
                            <strong>End:</strong> {new Date(booking.rentalEndDate).toLocaleString()} <br />
                        </li>
                    ))
                ) : (
                    <li>No bookings found.</li> // Message for no bookings
                )}
            </ul>
        </div>
    );
};

export default PreviousBookings;
