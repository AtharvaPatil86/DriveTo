const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking'); // Booking model
const Car = require('../models/Car'); // Import Car model to fetch car details
const JWT_SECRET = process.env.JWT_SECRET; // Use the environment variable for JWT_SECRET

const router = express.Router();

// Function to fetch a car based on category
const fetchCar = async (category) => {
    return await Car.findOne({ category: category, status: true });
};

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
    const { rentalStartDate, rentalEndDate, totalCost, token, category } = req.body; // Add token in the body

    // Validate input dates
    if (!rentalStartDate || !rentalEndDate || !totalCost || !token || !category) {
        return res.status(400).json({ error: 'All fields are required, including the token and category.' });
    }

    if (new Date(rentalStartDate) >= new Date(rentalEndDate)) {
        return res.status(400).json({ error: 'Start date must be before end date.' });
    }

    try {
        // Decode the token to get the customer ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const customerId = decoded.id;

        // Fetch the first available car from the Car model based on category
        const car = await fetchCar(category); // Call the fetchCar function

        if (!car) {
            return res.status(404).json({ error: 'No available car found in this category' });
        }

        // Create a new booking linked to the authenticated user and fetched car
        const newBooking = async () => {
            try {
                const bookingData = {
                    rentalStartDate: bookingDetails.startDate,
                    rentalEndDate: bookingDetails.endDate,
                    totalCost: bookingDetails.totalCost, // Make sure this field exists
                    token: yourToken, // Ensure you have the JWT token here
                    category: car.category, // Make sure the category exists
                };
        
                console.log('Booking Data:', bookingData); // Log the data to be sent
        
                const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
                console.log('Booking confirmed:', response.data);
            } catch (error) {
                console.error('Error creating booking:', error);
                // Handle error appropriately
            }
        };
        

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'JWT token expired' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

module.exports = router;
