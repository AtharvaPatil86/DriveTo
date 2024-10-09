// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const Car = require('../models/Car'); // Adjust path if needed

// Create a new car
router.post('/', async (req, res) => {
    const { name, model, numberPlate, insuranceNumber, year, category } = req.body;

    try {
        const newCar = new Car({ name, model, numberPlate, insuranceNumber, year, category });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Additional routes (if needed)
// e.g., get all cars, get car by ID, update car, delete car, etc.

// Export the router
module.exports = router;
