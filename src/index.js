const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// 🔐 Load environment variables
dotenv.config();

// ✅ Initialize Express app
const app = express();

// ✅ CORS Setup: Allow Netlify and localhost for frontend
app.use(
  cors({
    origin: ["https://sgvns-front.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Route Imports
const authRoutes = require("./Routes/auth.routes");
const circularRoutes = require("./Routes/circular.routes");
const notificationRoutes = require("./Routes/notification.routes");
const eventRoutes = require("./Routes/event.routes");

// ✅ Register API Routes
app.use("/api/auth", require('./Routes/auth.routes'));
app.use("/api/circulars", require('./Routes/circular.routes'));
app.use("/api/notifications", require('./Routes/notification.routes'));
app.use("/api/events", require('./Routes/event.routes'));

// ✅ Root Health Check
app.get("/", (req, res) => {
  res.send("✅ SGVNS Backend is running smoothly!");
});

// ✅ 404 Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "🚫 Route not found." });
});

// ✅ Global Error Handler (optional use)
app.use((err, req, res, next) => {
  console.error("❌ Internal Server Error:", err);
  res.status(500).json({ error: "Something went wrong." });
});

// ✅ MongoDB Connection and Server Start
const MONGO_URI = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log("✅ API Routes:");
      console.log("   • /api/auth");
      console.log("   • /api/circulars");
      console.log("   • /api/notifications");
      console.log("   • /api/events");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

// ✅ Handle Uncaught Errors
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});
