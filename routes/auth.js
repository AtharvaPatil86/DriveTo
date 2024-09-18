const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt
const User = require('../models/user.js');
//error idhar hai kuch idk
const fetchuser = require('../middleware/fetchuser'); // Import fetchuser middleware

const router = express.Router();

// Secret key to sign the JWT (should be stored in environment variables for security)
const JWT_SECRET = 'your_secret_key'; // Use process.env.JWT_SECRET in production

// POST request to /api/auth (User registration)
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user instance
        const user = new User({ name, email, password });

        // Save the user to the database
        await user.save();

        // Create a JWT token for the user
        const token = jwt.sign(
            { id: user._id},
            JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        // Return success response with the token
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: token // Send the token as part of the response
        });

    } catch (error) {
        // Handle any errors (e.g., database issues, validation errors)
        res.status(500).json({ error: error.message });
    }
});

// POST request to /api/auth/login (User login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // If email and password are valid, generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send success response with token
        res.json({
            message: 'Login successful',
            /*user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },*/
            token: token
        });

    } catch (error) {
        // Handle any errors (e.g., database issues)
        res.status(500).json({ error: error.message });
    }
});


//from token to id
router.post('/fetchuser', fetchuser, async (req, res) => {
    try {
        // Extract user ID from the request object (attached by fetchuser middleware)
        const userId = req.user.id;

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send user details (excluding password)
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            rentalHistory: user.rentalHistory
        });

    } catch (error) {
        // Handle any errors (e.g., database issues)
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;