const jwt = require('jsonwebtoken');

// Middleware function to verify JWT tokens
function jwtMiddleware(req, res, next) {
    // Retrieve the authorization header from the request
    const jwtToken = req.headers['authorization'];

    // Check if the authorization header is present and extract the token part
    if (!jwtToken || !jwtToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token not provided or invalid format' });
    }

    // Extract the token from the 'Bearer' scheme
    const tokenExtract = jwtToken.split(' ')[1];

    try {
        // Verify the token using the secret key 'HyperionDev'
        const payload = jwt.verify(tokenExtract, 'HyperionDev');

        // Attach the decoded payload to the request object for further use
        req.payload = payload;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, respond with a 403 Forbidden status
        res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = {
    jwtMiddleware
};
