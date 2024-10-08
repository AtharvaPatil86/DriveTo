const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const nodemailer = require('nodemailer');
const fetchuser = require('../middleware/fetchuser');
require('dotenv').config();
const router = express.Router();
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// User registration
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch user details
router.post('/fetchuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            rentalHistory: user.rentalHistory,
        });

    } catch (error) {
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

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested for a password reset. Click the following link to reset your password: ${resetUrl}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error while sending email:", error);
                return res.status(500).json({ error: 'Error sending email. Please try again later.' });
            }
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Password reset email sent.' });
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
        }

        user.password = await bcrypt.hash(password, 10); // Hash new password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: 'Password has been successfully reset.' });

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
});

module.exports = router;
