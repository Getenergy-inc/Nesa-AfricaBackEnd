import crypto from "crypto";
const otpStorage = new Map();

/**
 * Generate a 6-digit OTP
 */
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Store OTP with expiration (valid for 5 minutes)
 */
export const storeOTP = (email, otp) => {
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes validity
  otpStorage.set(email, { otp, expirationTime });
};

/**
 * Verify if OTP is correct and not expired
 */
export const verifyOTP = (email, userOTP) => {
  const record = otpStorage.get(email);
  if (!record) return false;

  const { otp, expirationTime } = record;
  if (Date.now() > expirationTime) {
    otpStorage.delete(email);
    return false; // OTP expired
  }

  if (otp !== userOTP) return false; // Invalid OTP

  otpStorage.delete(email);
  return true;
};
