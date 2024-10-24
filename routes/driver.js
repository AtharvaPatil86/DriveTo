const express = require('express');
const Driver = require('../models/Driver');
const router = express.Router();

// POST: Create a new driver
router.post('/', async (req, res) => {
  try {
    console.log(req.body); // Log the request body to see what the frontend is sending
    const { name, licenseNumber, phoneNumber, email, dateOfBirth, rating } = req.body;

    if (!name || !licenseNumber || !phoneNumber || !email || !dateOfBirth) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the driver already exists
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver with this email already exists.' });
    }

    // Create and save a new driver
    const newDriver = new Driver({
      name,
      licenseNumber,
      phoneNumber,
      email,
      dateOfBirth,
      rating
    });

    await newDriver.save();
    res.status(201).json({ message: 'Driver created successfully!', driver: newDriver });
  } catch (error) {  // Ensure this is inside a 'try-catch' block
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
