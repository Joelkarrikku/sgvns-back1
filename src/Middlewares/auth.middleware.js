const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Authentication Middleware: Verifies JWT and sets req.user
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach user object to the request
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Role-Based Authorization Middleware (flexible for any role)
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
};

// ✅ Admin-Only Shortcut Middleware (if you want a direct check)
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = {
  verifyToken,      // Authenticate JWT
  authorizeRole,    // Authorize based on roles (Admin, Staff, etc.)
  isAdmin           // Optional: Admin-only shortcut
};
