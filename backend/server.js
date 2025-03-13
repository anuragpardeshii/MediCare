const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Route imports
const userRoutes = require("./routes/userRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Middleware Setup
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

//  CORS Configuration (Fixes cookie issues)
app.use(
  cors({
    origin: process.env.FRONTEND_URI, // Allow frontend origin
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Vercel Node.js Backend!");
});

//  Express-Session (No MongoStore)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Store in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //  Must be `true` in production with HTTPS
      httpOnly: true, // Protects from XSS attacks
      sameSite: "Lax", //  Required for cross-origin cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 Day
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", appointmentRoutes);
app.use("/api/appointments", appointmentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ success: false, error: err.message || "Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
