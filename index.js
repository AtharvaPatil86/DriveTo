//working one
require('dotenv').config();
const express = require('express');
const connectDB = require('./db'); // Import the function
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Expiring time and availability (Cron job)
const scheduleCarStatusUpdate = require('./middleware/cornjob.js'); // Adjust to the path of cronJobs
scheduleCarStatusUpdate();
//Driver info
const driverRoutes = require('./routes/driver');
app.use('/api/drivers', driverRoutes);
//////////////////////

// Routes
app.use('/api/auth', require('./routes/auth')); // Ensure 'auth' exports a router
app.use('/api/bookings', require('./routes/bookings')); // Ensure 'bookings' exports a router
const carRoutes = require('./routes/car');
app.use('/api/cars', carRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
