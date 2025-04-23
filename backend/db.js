require('dotenv').config(); // Load environment variables from a .env file into process.env
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const uri = process.env.MONGO_URI; // Retrieve the MongoDB connection URI from environment variables

const connectToDatabase = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true, // Use the new URL string parser
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
    });
    console.log('Connected to MongoDB'); // Log a message on successful connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error); // Log an error message if connection fails
  }
};

module.exports = connectToDatabase; // Export the connectToDatabase function
