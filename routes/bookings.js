const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser'); // Middleware to authenticate user
const Booking = require('../models/Booking'); // Booking model

// POST /api/bookings - Create a new booking
router.post('/', fetchuser, async (req, res) => {
    try {
        const { car, rentalStartDate, rentalEndDate, totalCost } = req.body;

        // Validate required fields
        if (!car || !rentalStartDate || !rentalEndDate || !totalCost) {
            return res.status(400).json({ error: 'Please provide all necessary booking details' });
        }

        const customerId = req.user.id;

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
        res.status(500).json({ error: 'Internal server error' });
    }
});
//gettt
router.get('/', fetchuser, async (req, res) => {
    try {
        const customerId = req.user.id;

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