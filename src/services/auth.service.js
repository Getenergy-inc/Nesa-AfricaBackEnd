import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/postgresql/User.js";
import Role from "../models/Role.js";
import { generateOTP, storeOTP, verifyOTP } from "../utils/otpUtils.js";
import { sendOTPEmail } from "../utils/emailService.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../utils/ResetEmailService.js";
import Wallet from "../models/postgresql/Wallet.js"; // Import your Wallet model


export const signupUser = async ({ fullName, email, password, role , nomineeType, stateOrRegion, image, phoneNumber}) => {
  try {
    // Use provided role or fallback to "General User"
    const roleToAssign = role || "General User";

    // Check if the role exists in the Role table
    let existingRole = await Role.findOne({ where: { name: roleToAssign } });

    // If provided role doesn't exist, fallback to "General User"
    if (!existingRole) {
      existingRole = await Role.findOne({ where: { name: "General User" } });
      if (!existingRole) {
        return { status: 400, message: "Default role 'General User' not found in database" };
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { status: 400, message: "Email is already registered" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with the valid role
    const newUser = await User.create({
      fullName,
      email,
      nomineeType,
      stateOrRegion,
      image,
      phoneNumber,
      password: hashedPassword,
      role: existingRole.name,
    });

    // Create wallet if not already present
    const existingWallet = await Wallet.findOne({ where: { user_id: newUser.id } });
    if (!existingWallet) {
      await Wallet.create({
        user_id: newUser.id,
        points_balance: 0,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      status: 201,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        nomineeType: newUser.nomineeType,
        stateOrRegion: newUser.stateOrRegion,
        image: newUser.image,
        phoneNumber:newUser.phoneNumber
      },
      token,
    };

  } catch (error) {
    return { status: 500, message: "Error creating user", error: error.message };
  }
};


// login Service logic


/**
 * User login service with 2FA OTP
 */
export const loginUser = async ({ email, password }) => {
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { status: 400, message: "Invalid email or password" };
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, message: "Invalid email or password" };
    }

    // Generate OTP
    const otp = generateOTP();
    await storeOTP(user.email, otp);

    // Send OTP via email
    await sendOTPEmail(user.email, otp);

    return {
      status: 200,
      message: "OTP sent to email for verification",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  } catch (error) {
    return { status: 500, message: "Error logging in", error: error.message };
  }
};

// to change user password service

export const changePassword = async ({ email, oldPassword, newPassword }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return { status: 404, message: "User not found" };

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return { status: 400, message: "Old password is incorrect" };

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return { status: 200, message: "Password changed successfully" };
  } catch (error) {
    return { status: 500, message: "Error changing password", error: error.message };
  }
};

// to Reset user password in service
// Function to reset the password and send the reset email

export const resetPassword = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return { status: 404, message: "User not found" };

    // Generate a new password
    const newPassword = crypto.randomBytes(6).toString("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Send the new password to the user's email
    await sendResetPasswordEmail(user.email, newPassword);

    return { status: 200, message: "New password sent to email" };
  } catch (error) {
    return { status: 500, message: "Error resetting password", error: error.message };
  }


};