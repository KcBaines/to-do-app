const { registerUser } = require('../controllers/userController'); // Import the registerUser controller function

// Define the registerRoute function
const registerRoute = (app) => {
    // Set up a POST route for '/register' that uses the registerUser controller function
    app.post('/register', registerUser);
};

module.exports = registerRoute; // Export the registerRoute function to be used in other parts of the application
