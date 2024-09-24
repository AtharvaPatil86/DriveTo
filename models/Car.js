const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
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
    }
    // Add other relevant fields here
});

module.exports = mongoose.model('Car', CarSchema);
