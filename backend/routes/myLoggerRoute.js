const { loggerMiddleware } = require('../middleware/myLogger'); // Import the loggerMiddleware function
const { loggerController } = require('../controllers/loggerController'); // Import the loggerController function

// Define the myLoggerRoute function
const myLoggerRoute = (app) => {
  // Set up a GET route for the root path ('/') with middleware and controller
  app.get('/', loggerMiddleware, loggerController);
};

module.exports = myLoggerRoute; // Export the myLoggerRoute function to be used in other parts of the application
