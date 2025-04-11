import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { verifyUserOTP, resendOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyUserOTP); // Verify OTP
router.post("/resend-otp", resendOTP); // Resend OTP if expired

export default router;
