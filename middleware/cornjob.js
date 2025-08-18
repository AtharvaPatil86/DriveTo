const cron = require('node-cron');
const Booking = require('../models/Booking');
const Car = require('../models/Car');

/**
 * Schedule a task to run every minute.
 * It checks for expired bookings (where rentalEndDate has passed and status is 'in-progress'),
 * updates their status to 'completed', and sets the associated car's availability to true.
 */
const scheduleCarStatusUpdate = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      // Find bookings that have expired and are still in-progress
      const expiredBookings = await Booking.find({
        rentalEndDate: { $lte: now },
        status: 'in-progress',
      });

      // Update each expired booking and its associated car
      await Promise.all(
        expiredBookings.map(async ({ _id, car }) => {
          await Booking.findByIdAndUpdate(_id, { status: 'completed' });
          await Car.findByIdAndUpdate(car, { status: true });
          console.log(`✔ Booking ${_id} marked as completed. Car ${car} set to available.`);
        })
      );
    } catch (err) {
      console.error('✖ Error updating car status:', err.message);
    }
  });
};

module.exports = scheduleCarStatusUpdate;
