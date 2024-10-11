require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);  // Make sure MONGO_URI is correct in the .env file
    console.log('MongoDB connected successfully');  // Log message if connected
  } catch (error) {
    console.error('MongoDB connection error:', error.message);  // Log any errors
    process.exit(1);  // Exit if connection fails
  }
};

module.exports = connectDB;
