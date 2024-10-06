const cron = require('node-cron');
const Booking = require('../models/Booking');
const Car = require('../models/Car');

// This function will check expired bookings every minute
function scheduleCarStatusUpdate() {
    cron.schedule('* * * * *', async () => {
        const now = new Date();

        const expiredBookings = await Booking.find({ 
            rentalEndDate: { $lte: now }, 
            status: 'in-progress' 
        });

        for (let booking of expiredBookings) {
            await Booking.findByIdAndUpdate(booking._id, { status: 'completed' });
            await Car.findByIdAndUpdate(booking.car, { status: true });

            console.log(`Updated booking ${booking._id} and car ${booking.car} to available`);
        }
    });
}

module.exports = scheduleCarStatusUpdate;
