import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";  // Authentication routes
import userRoutes from "./routes/user.routes.js";  // User profile & protected routes
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import nominationRoutes from "./routes/nominationRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import votingRoutes from "./routes/voting.routes.js";
import ambassadorRoutes from "./routes/ambassador.routes.js";
import donationRoutes from "./routes/donation.routes.js";
import forumRoutes from "./routes/forum.routes.js";
import judgeRoutes from "./routes/judge.routes.js";
import membershipRoutes from "./routes/membership.routes.js";
import merchandiseOrderRoutes from "./routes/merchandiseOrder.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import volunteerRoutes from "./routes/volunteer.routes.js";
import judgeApplication from "./routes/applicantRoutes.js";




dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging




// Public Routes
app.use("/api/auths", authRoutes); // Signup & Login routes
app.use("/api", uploadRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/referral", referralRoutes)




// Protected Routes (Require JWT Authentication)
app.use("/api/user", userRoutes); // User-related routes
app.use("/api/nominations", nominationRoutes);
app.use("/api", walletRoutes);
app.use("/api/votes", votingRoutes);
app.use("/api/ambassadors", ambassadorRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/judges", judgeRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/merchandise-orders", merchandiseOrderRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/judge-apply", judgeApplication);



// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to NESA-Africa 2025 API!");
});

export default app;
