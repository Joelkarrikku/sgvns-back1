const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateAdmin = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied: No token provided" });
        }

        // Ensure JWT secret exists
        if (!process.env.JWT_SECRET) {
            console.error("⚠️ JWT_SECRET is missing in environment variables!");
            return res.status(500).json({ message: "Server misconfiguration: JWT secret missing" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired. Please log in again." });
            }
            console.error("JWT Verification Error:", error.message);
            return res.status(400).json({ message: "Invalid token" });
        }

        // Find user in database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Ensure user is an admin
        if (!user.role || user.role.toLowerCase() !== "Admin") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        // Attach user to request object for later use
        req.user = User;

        console.log(`✅ Admin authenticated: ${user.email}`);

        // Proceed to next middleware or route
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = authenticateAdmin;
