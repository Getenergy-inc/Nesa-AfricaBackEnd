import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Extract environment variables
const {
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
  EMAIL_USER,
} = process.env;

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URI
);

// Set credentials
oauth2Client.setCredentials({
  refresh_token: EMAIL_REFRESH_TOKEN,
});

// Send OTP email function
export const sendOTPEmail = async (email, otp) => {
  try {
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: EMAIL_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: EMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `"NESA-Africa" <${EMAIL_USER}>`,
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

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully:", result.messageId);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message || error);
  }
};
