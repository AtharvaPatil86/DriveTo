const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Booking = require('../models/Booking'); // Booking model
const JWT_SECRET = 'your_secret_key'; // Replace with process.env.JWT_SECRET

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token

        // Extract booking data from the request body
        const { car, rentalStartDate, rentalEndDate, totalCost } = req.body;

        // Verify the JWT token
        if (!token) {
            return res.status(401).json({ error: 'Token is missing' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const customerId = decoded.id; // Assuming the token contains the user ID

        // Validate required fields
        if (!car || !rentalStartDate || !rentalEndDate || !totalCost) {
            return res.status(400).json({ error: 'Please provide all necessary booking details' });
        }

        // Create and save the new booking
        const newBooking = new Booking({
            car,
            customer: customerId,
            rentalStartDate,
            rentalEndDate,
            totalCost,
            status: 'booked'
        });

        await newBooking.save();

        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking
        });
    } catch (err) {
        console.error('Error creating booking:', err); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/bookings - Get all bookings for the authenticated user
router.get('/', async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token

        // Verify the JWT token
        if (!token) {
            return res.status(401).json({ error: 'Token is missing' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const customerId = decoded.id;

        // Find all bookings for the authenticated user
        const bookings = await Booking.find({ customer: customerId }).populate('car');

        if (!bookings.length) {
            return res.status(404).json({ error: 'No bookings found' });
        }

        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err); // Log the error to the console
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
