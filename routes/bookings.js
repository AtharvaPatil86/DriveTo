const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Booking = require('../models/Booking'); // Booking model
const Car = require('../models/Car'); // Import Car model to fetch car details
const JWT_SECRET = 'your_secret_key'; // Replace with process.env.JWT_SECRET
const fetchUser = require('../middleware/fetchUser');

// POST /api/bookings - Create a new booking
router.post('/', fetchUser, async (req, res) => {
    const { rentalStartDate, rentalEndDate, totalCost } = req.body;

    try {
        // Fetch the first available car from the Car model
        const car = await Car.findOne(); // Modify this to include any specific conditions if needed

        if (!car) {
            return res.status(400).json({ error: 'No cars available for booking' });
        }

        // Create a new booking linked to the authenticated user
        const newBooking = new Booking({
            customer: req.user.id, // Access user ID from req.user (set by fetchUser middleware)
            car: car._id, // Use the fetched car's ObjectId
            rentalStartDate,
            rentalEndDate,
            totalCost,
            status: 'booked' // Set an initial status
        });

        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/bookings - Get all bookings for the authenticated user
// GET /api/bookings - Get all bookings for the authenticated user
router.get('/', async (req, res) => {
    try {
        // Extract the token from the query parameters
        const token = req.query.token;

        if (!token) {
            return res.status(401).json({ error: 'Token is missing' });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, JWT_SECRET);
        const customerId = decoded.id;

        // Find all bookings for the authenticated user
        const bookings = await Booking.find({ customer: customerId }).populate('car');

        if (!bookings.length) {
            return res.status(404).json({ error: 'No bookings found' });
        }

        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
