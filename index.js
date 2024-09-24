//working one
require('dotenv').config();
const express = require('express');
const connectDB = require('./db'); // Import the function
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
// Connect to the database
connectDB();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // Ensure 'auth' exports a router
app.use('/api/bookings', require('./routes/bookings')); // Ensure 'bookings' exports a router
const carRoutes = require('./routes/car');
app.use('/api/cars', carRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
