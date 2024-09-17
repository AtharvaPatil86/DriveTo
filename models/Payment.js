const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'debit card', 'cash', 'bank transfer'],
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Payment', PaymentSchema);
