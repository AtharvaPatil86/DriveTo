const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to authenticate users based on a JWT token.
 * Expects the token in the request body (e.g., req.body.token).
 */
const authenticate = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    // Decode and verify the JWT
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user by ID, excluding sensitive fields like password
    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attach user object to request for use in later middlewares or routes
    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
