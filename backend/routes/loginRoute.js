const { loginUser } = require('../controllers/userController'); // Import the loginUser controller function

// Define the login route
const loginRoute = (app) => {
    app.post('/login', loginUser); // Route to handle user login requests
};

module.exports = loginRoute; // Export the loginRoute function to be used in other parts of the application
