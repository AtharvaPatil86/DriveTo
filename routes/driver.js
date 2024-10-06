const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver'); // Adjust path if needed

// Define your routes here
router.post('/', async (req, res) => {
    const { name, licenseNumber, phoneNumber } = req.body;

    try {
        const newDriver = new Driver({ name, licenseNumber, phoneNumber });
        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Other routes...

// Export the router
module.exports = router; // Corrected line
