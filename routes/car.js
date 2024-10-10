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



// POST /api/cars/find-by-category - Find the first available car by category
router.post('/find-by-category', async (req, res) => {
    const { category } = req.body;  // Expect category in the request body

    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    try {
        // Search for the first available car in the given category
        const car = await Car.findOne({ category: category, status: true });

        if (!car) {
            return res.status(404).json({ message: 'No available car found in this category' });
        }

        res.status(200).json(car);  // Send back the found car
    } catch (error) {
        console.error('Error finding car:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Additional routes (if needed)
// e.g., get all cars, get car by ID, update car, delete car, etc.

// Export the router
module.exports = router;
