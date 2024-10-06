const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    }
    
}, {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
});

module.exports = mongoose.model('Driver', DriverSchema);
