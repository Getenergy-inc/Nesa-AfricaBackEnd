import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});

// Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    accessToken: async () => {
      const { token } = await oauth2Client.getAccessToken();
      return token;
    },
  },
});

// 📧 Send Nomination Email
export const sendNominationEmail = async (to, nomineeName, nominationId) => {
  const acceptUrl = `https://yourdomain.com/nomination/accept/${nominationId}`;
  const rejectUrl = `https://yourdomain.com/nomination/reject/${nominationId}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f7f7f7; border-radius: 10px;">
      <h2 style="color: #333;">🎉 You've Been Nominated!</h2>
      <p>Dear ${nomineeName},</p>
      <p>We are excited to inform you that you have been nominated for an award by NESA Africa.</p>
      <p>If you're interested in this nomination, please click one of the buttons below:</p>
      <div style="margin: 20px 0;">
        <a href="${acceptUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">✅ Accept</a>
        <a href="${rejectUrl}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">❌ Reject</a>
      </div>
      <p>We look forward to your response.</p>
      <p>Warm regards,<br><strong>NESA Africa Team</strong></p>
    </div>
  `;

  const mailOptions = {
    from: `"NESA-Africa" <${process.env.EMAIL_USER}>`,
    to,
    subject: "You've Been Nominated – Take Action!",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Nomination email sent successfully");
  } catch (error) {
    console.error("❌ Error sending nomination email:", error);
  }
};
