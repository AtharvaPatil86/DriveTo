const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123'; // Use environment variable for security

const fetchuser = (req, res, next) => {
    try {
        // Get token from Authorization header or from body as fallback
        const token = req.headers.authorization?.split(' ')[1] || req.body.token;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ error: 'Token is missing' });
        }

        // Verify the JWT token
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err); // Log the error
                return res.status(403).json({ error: 'Invalid token' });
            }

            // Attach user data to request object (decoded token contains user info)
            req.user = decoded;
            next(); // Proceed to the next middleware
        });
    } catch (error) {
        console.error("Error in token validation:", error); // Log any unexpected errors
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = fetchuser;
