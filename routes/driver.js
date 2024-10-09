// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver'); // Adjust path if needed

// Create a new driver
router.post('/', async (req, res) => {
    const { name, licenseNumber, phoneNumber, email, dateOfBirth } = req.body;

    try {
        const newDriver = new Driver({ name, licenseNumber, phoneNumber, email, dateOfBirth });
        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Additional routes (if needed)
// e.g., get all drivers, get driver by ID, update driver, delete driver, etc.

// Export the router
module.exports = router;
