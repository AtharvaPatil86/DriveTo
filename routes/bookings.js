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

    // Validate input dates and other required fields
    if (!rentalStartDate || !rentalEndDate || !totalCost || !token || !category) {
        return res.status(400).json({ error: 'All fields are required, including the token and category.' });
    }

    // Check if the start date is before the end date
    if (new Date(rentalStartDate) >= new Date(rentalEndDate)) {
        return res.status(400).json({ error: 'Start date must be before end date.' });
    }

    try {
        // Decode the JWT token to get the customer ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const customerId = decoded.id;

        // Fetch the first available car from the Car model based on category
        const car = await fetchCar(category); // Call the fetchCar function

        if (!car) {
            return res.status(404).json({ error: 'No available car found in this category.' });
        }

        // Create a new booking linked to the authenticated user and the fetched car
        const newBooking = new Booking({
            customer: customerId,  // Access user ID from the decoded token
            car: car._id,          // Use the fetched car's ObjectId
            rentalStartDate,
            rentalEndDate,
            totalCost,
            status: 'booked'       // Set an initial status
        });

        // Save the new booking to the database
        await newBooking.save();

        // Return a success response with the newly created booking
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error.message);

        // Handle token expiration or other errors
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'JWT token expired' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});
router.get('/available', async (req, res) => {
    try {
      const availableCars = await Car.find({ status: 0 });
      res.json(availableCars);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });


router.post('/fetch', async (req, res) => {
    const { token } = req.body;

    // Check if the token exists
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Decode the token to get the user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Log the decoded user ID to ensure it's being extracted correctly
        console.log('Decoded User ID:', userId);

        // Fetch bookings linked to this user
        const bookings = await Booking.find({ customer: userId }).populate('car');

        // Log the retrieved bookings
        console.log('Bookings found:', bookings);

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this user' });
        }

        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'JWT token expired' });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});
module.exports = router;
