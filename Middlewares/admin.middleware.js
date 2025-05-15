const jwt = require('jsonwebtoken');
const User = require('../models/user');  // ✅ This is fine, your file is User.js

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);

        if (!user || user.role !== 'Admin') {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }

        req.user = user;  // ✅ Attach full user object, not just verified token
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
