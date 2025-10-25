const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // ✅ Added dotenv for environment variables
const connectDB = require('./db'); // Database connection function

// ✅ Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to the database with error handling
connectDB()
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));        // Auth routes
app.use('/api/bookings', require('./routes/bookings'));// Booking routes

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🚗 DriveTo API is running...');
});

// ✅ 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Error handler middleware
app.use((err, req, res, next) => {
  console.error('⚠️ Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
