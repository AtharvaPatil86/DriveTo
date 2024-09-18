// db.js
const mongoose = require('mongoose'); // Corrected import

function connectDB() {
    mongoose.connect('mongodb+srv://laukik:Boka123@cluster0.ycz62gh.mongodb.net/DriveMe', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('MongoDB connection successful');
    });

    connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
}

module.exports = connectDB; // Export the function
