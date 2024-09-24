const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt
const User = require('../models/user.js');
const nodemailer = require('nodemailer');
const fetchuser = require('../middleware/fetchuser'); // Import fetchuser middleware
require('dotenv').config();
const router = express.Router();
const crypto = require('crypto');


// Secret key to sign the JWT (should be stored in environment variables for security)
const JWT_SECRET = 'supersecretkey123'; // Use process.env.JWT_SECRET in production

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
            { id: user._id, name: user.name},
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
            { id: user._id, email: user.email, role: user.role,name: user.name },
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




// Generate a reset token and send email
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email doesn't exist." });
        }

        // Generate password reset token (random token)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

        // Save token to user model with an expiration time
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send the email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Use your environment variable for email user
                pass: process.env.EMAIL_PASS, // Use your environment variable for email password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested for a password reset. Click the following link to reset your password: ${resetUrl}`,
        };

        // Send the email and catch any errors in sending
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error while sending email:", error); // Log the detailed error
                return res.status(500).json({ error: 'Error sending email. Please try again later.' });
            }
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Password reset email sent.' });
        });

    } catch (error) {
        console.error('Server error:', error); // Log server-side errors
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

//reset password

// routes/auth.js
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        // Find user by reset token and check if token has expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
        }

        // Set new password
        user.password = password;
        user.resetPasswordToken = undefined; // Remove token
        user.resetPasswordExpires = undefined; // Remove expiration date

        // Save updated user
        await user.save();

        res.json({ message: 'Password has been successfully reset.' });

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
});

module.exports = router;