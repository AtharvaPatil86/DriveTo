const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Sedan', 'SUV', 'Mini', 'Truck'], // Added 'Truck'
        required: true
    },
    truckCategory: {
        type: String,
        enum: ['Mini', 'Medium', 'Large'], // Sub-categories for Truck
        required: function() {
            return this.type === 'Truck'; // Required only if the type is 'Truck'
        }
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    numberplate: {
        type: String,
        required: true
    },
    
    status: {
        type: Boolean,
        default: true // Assuming 'true' means available for rent
    }
    // Add other relevant fields here
});

module.exports = mongoose.model('Car', CarSchema);
