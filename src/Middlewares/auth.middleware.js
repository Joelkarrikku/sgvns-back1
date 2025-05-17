const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach full user object
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// Role-based access control middleware
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied: Only ${role}s allowed` });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };
