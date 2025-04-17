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

// Function to send the reset password email
export const sendResetPasswordEmail = async (email, newPassword) => {
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

    // Link to change the password (you can customize the URL as needed)
    const changePasswordUrl = `${process.env.CLIENT_URL}/change-password`; // Adjust URL as needed

    const mailOptions = {
      from: `"NESA-Africa" <${EMAIL_USER}>`,
      to: email,
      subject: "Password Reset - NESA Africa",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #333;">NESA-Africa Password Reset</h2>
          <p style="font-size: 16px;">Your password has been successfully reset.</p>
          <p style="font-size: 16px;">Your new password is:</p>
          <h1 style="color: #4CAF50;">${newPassword}</h1>
          <p style="font-size: 14px;">Please login and change your password after logging in. You can update your password by clicking the link below:</p>
          <a href="${changePasswordUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Change Password</a>
          <hr>
          <p style="font-size: 12px; color: gray;">If you did not request this password reset, please ignore this email.</p>
          <p style="font-size: 12px; color: gray;">Alternatively, you can visit <a href="${process.env.CLIENT_URL}/login">Login Page</a> to login.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent successfully:", result.messageId);
  } catch (error) {
    console.error("❌ Error sending reset password email:", error.message || error);
  }
};
