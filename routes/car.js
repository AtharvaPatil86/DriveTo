const express = require('express');
const Car = require('../models/Car.js');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST request to register a new car
router.post('/', async (req, res) => {
    const { make, model, year, numberplate } = req.body;

    try {
        // Validate required fields
        if (!make || !model || !year || !numberplate) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the number plate already exists
        const existingNumber = await Car.findOne({ numberplate }); // Use Car here
        if (existingNumber) {
            return res.status(400).json({ error: 'Car already registered' });
        }

        // Create a new Car instance
        const car = new Car({ make, model, year, numberplate });

        // Save the car to the database
        await car.save();

        // Create a JWT token for the car
        const token = jwt.sign(
            { model: car.model, numberplate: car.numberplate },
            process.env.JWT_SECRET, // Make sure to use your JWT secret from environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        res.json({
            message: 'Car registered successfully',
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
