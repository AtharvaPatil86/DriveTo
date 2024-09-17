const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    rentalStartDate: {
        type: Date,
        required: true,
    },
    rentalEndDate: {
        type: Date,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'in-progress', 'completed', 'cancelled'],
        default: 'booked',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Booking', BookingSchema);
