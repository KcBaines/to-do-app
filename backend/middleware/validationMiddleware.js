// Middleware to validate that the email ends with '@gmail.com'
const validateUsername = (req, res, next) => {
    const { email } = req.body;  // Extract email from req.body

    // Check if the email is provided and does not end with '@gmail.com'
    if (email && !email.endsWith('@gmail.com')) {
        // Respond with a 403 Forbidden status if validation fails
        return res.status(403).json({ message: 'Email must end with @gmail.com' });
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
};

// Middleware to validate the content type of POST requests
const validateContentType = (req, res, next) => {
    // Check if the request method is POST and content type is not 'application/json'
    if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
        // Respond with a 400 Bad Request status if validation fails
        return res.status(400).json({ message: 'Content-Type must be application/json' });
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
};

module.exports = {
    validateUsername,
    validateContentType
};
