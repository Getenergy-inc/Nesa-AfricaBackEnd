import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";  // Authentication routes
import userRoutes from "./routes/user.routes.js";  // User profile & protected routes
import uploadRoutes from "./routes/uploadRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging

// Public Routes
app.use("/api/auth", authRoutes); // Signup & Login routes
app.use("/api", uploadRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Protected Routes (Require JWT Authentication)
app.use("/api/user", userRoutes); // User-related routes

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to NESA-Africa 2025 API!");
});

export default app;
