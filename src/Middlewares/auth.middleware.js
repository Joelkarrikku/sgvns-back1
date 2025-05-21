const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied: No token provided" });
        }

        console.log("Auth Header:", req.header("Authorization")); // ✅ Log received header

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(400).json({ message: "Invalid token" });
        }

        console.log("Decoded Token:", decoded); // ✅ Log decoded token

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        console.log("User Role:", user.role); // ✅ Log extracted role

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ✅ Role-Based Access Control Middleware
const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Access denied: Only ${role}s allowed` });
        }
        next();
    };
};

// ✅ Admin-Only Middleware
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

module.exports = { verifyToken, verifyRole, isAdmin };
