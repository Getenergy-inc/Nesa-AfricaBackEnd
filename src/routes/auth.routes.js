import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { verifyUserOTP, resendOTP } from "../controllers/authController.js";
import { changePasswordController, resetPasswordController } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyUserOTP); // Verify OTP
router.post("/resend-otp", resendOTP); // Resend OTP if expired


router.post("/change-password", changePasswordController);
router.post("/reset-password", resetPasswordController);


export default router;
