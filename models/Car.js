// models/Car.js
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    numberPlate: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    insuranceNumber: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['mini', 'sedan', 'SUV', 'truck'], // Add truck categories as necessary
        required: true,
    },
    status: {
        type: Boolean,
        default: false, // false for available, true for booked/not available
    }
}, {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Car', CarSchema);
