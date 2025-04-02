import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();


router.get("/profile", authenticate, getUserProfile); // Protected route

export default router;
