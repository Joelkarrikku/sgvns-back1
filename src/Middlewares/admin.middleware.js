const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role.toLowerCase()!== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    req.user = user; // Attach full user object
    next();
  } catch (error) {
    console.error('Admin Middleware Error:', error.message);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
