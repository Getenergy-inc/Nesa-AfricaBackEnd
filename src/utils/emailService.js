import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // The redirect URI, use this URL for testing
);

// Set refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});

// Setup Nodemailer transporter using OAuth2
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    accessToken: async () => {
      // Get new access token using refresh token
      const { token } = await oauth2Client.getAccessToken();
      return token;
    },
  },
});

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"NESA-Africa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code for Login Verification",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #333;">NESA-Africa Login Verification</h2>
        <p style="font-size: 16px;">Use the OTP below to verify your login:</p>
        <h1 style="color: #4CAF50;">${otp}</h1>
        <p style="font-size: 14px;">This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
        <hr>
        <p style="font-size: 12px; color: gray;">If you didn't request this OTP, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};
