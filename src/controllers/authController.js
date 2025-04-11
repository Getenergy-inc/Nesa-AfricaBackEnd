import { verifyOTP, generateOTP, storeOTP } from "../utils/otpUtils.js";
import { sendOTPEmail } from "../utils/emailService.js";
import jwt from "jsonwebtoken";
import User from "../models/postgresql/User.js";

/**
 * Verify OTP after login
 */
export const verifyUserOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!verifyOTP(email, otp)) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // Generate JWT token after OTP verification
  const user = await User.findOne({ where: { email } });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "OTP verified successfully",
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};

/**
 * Resend OTP if expired
 */
export const resendOTP = async (req, res) => {
  const { email } = req.body;

  // Generate a new OTP and store it
  const otp = generateOTP();
  storeOTP(email, otp);

  // Send OTP via email
  await sendOTPEmail(email, otp);

  res.status(200).json({ message: "New OTP sent to email" });
};
