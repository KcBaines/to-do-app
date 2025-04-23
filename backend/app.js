const express = require('express'); // Import the Express library
const app = express(); // Create an Express application
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON requests
const cors = require('cors'); // Import CORS for handling cross-origin requests
const myLoggerRoute = require('./routes/myLoggerRoute'); // Import the logger route
const loginRoute = require('./routes/loginRoute'); // Import the login route
const registerRoute = require('./routes/registerRoute'); // Import the registration route
const userDataRoute = require('./routes/secure/userDataRoute'); // Import the user data route
const { validateUsername, validateContentType } = require('./middleware/validationMiddleware'); // Import validation middleware
const connectToDatabase = require('./db'); // Import the function to connect to the database

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests

// Configure CORS to allow requests from specific origins and with specific methods/headers
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Apply global middleware for content type validation and username validation
app.use(validateContentType);
app.use(validateUsername);

// Set up routes
myLoggerRoute(app); // Apply the logger route
loginRoute(app); // Apply the login route
registerRoute(app); // Apply the registration route
app.use('/user-data', userDataRoute); // Apply user data routes

// Connect to the database
connectToDatabase();

// Start the server on the specified port
const PORT = process.env.PORT || 8080; // Use environment variable PORT or default to 8080
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`); // Log a message when the server starts
});
