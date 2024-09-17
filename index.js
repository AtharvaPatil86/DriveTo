const express = require('express');
const connectDB = require('./db'); // Import the function
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // Ensure 'auth' exports a router
app.use('/api/bookings', require('./routes/bookings')); // Ensure 'bookings' exports a router

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
