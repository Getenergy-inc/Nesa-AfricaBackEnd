import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Setup OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});

// Send nomination email function
export const sendJudgeEmail = async (to, nomineeName, nominationId, signupLink) => {
  try {
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });

    // const acceptUrl = `https://nesa-test-4alu.vercel.app/nomineesignup1`;
    // const rejectUrl = `https://yourdomain.com/nomination/reject/${nominationId}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #191307; color: #ffffff; padding: 20px;">
        <!-- Nav Cover -->
        <div style="display: flex; align-items: center; padding: 10px;">
          <img src="cid:logo" alt="NESA Logo" width="80" style="margin-right: 20px;" />
          <h1 style="font-size: 20px;">The New Education <br> Standard Awards Africa 2025</h1>
        </div>
      </div>
        
      <div style="font-family: Arial, sans-serif; background-color:rgb(241, 240, 238); color:rgb(14, 13, 13); padding: 20px;">
        <!-- Intro Text -->
        <div style="margin-top: 30px; padding-top: 8px;">
          <h4 style="margin-bottom: 10px;">Congratulations, You have been approved to be a judge for the NESA Awards 2025 😊🎉</h4>
          <p style="line-height: 1.6;">
            Dear ${nomineeName},<br><br>
            Congratulations! We are pleased to inform you that your application to become a judge for the prestigious New Education Standard Awards 2025 has been approved.
            Your expertise and dedication to advancing education make you an invaluable addition to our panel of judges.<br><br>

            As a judge, you will play a key role in recognizing and celebrating outstanding contributions to education across Africa, in order to promote inclusive and equitable quality education for all.<br><br>

            To confirm your participation and receive further details about your role, please click the link below :
          </p>
          <div style="margin: 20px 0;">
            <a href="${signupLink}" style="color: green; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;"> ✅ Confirm Your Role as a Judge </a>
          </div>

          <p style="line-height: 1.6;">
             We are excited to collaborate with you and look forward to your insights in shaping this landmark event.<br><br> 
             Should you have any questions, feel free to reach out.
          </p>

        </div>

       <!-- Flex container to center the child div -->
        <div style="margin: 0 auto; padding: 30px; background-color: #191307; width: 350px;  text-align: center; border-radius: 10px;">
          <img src="cid:logo" alt="NESA Logo" width="120" />
        </div>

        <!-- About Section -->
        <div style="padding: 20px;">
          <h4>Curious about what the NESA Awards stands for? Here is what NESA stands for and our mission</h4>
          <p style="line-height: 1.6;">
            New Education Standard Award Africa (NESA Africa) is a prestigious initiative committed to recognizing and celebrating excellence, innovation,
            and impactful contributions in education across Africa. Established to set new benchmarks in education, the awards serve as a catalyst for change,
            inspiring organizations, institutions, governments, and individuals to drive lasting improvements in the African education sector.
          </p>
        </div>

        <!-- Image Gallery -->
        <div style="text-align: center;">
            <div style="display: inline-block;">
              <img src="cid:img1" width="350" style="border-radius: 8px; margin-right: 20px;" />
              <img src="cid:img2" width="350" style="border-radius: 8px;" />
            </div>
        </div>

        <p style="margin-top: 30px;">Warm regards,<br><strong>NESA Africa Team</strong></p>
      </div>
      <!-- Footer Section -->
<div style="background-color:rgb(241, 240, 238); padding: 30px; font-family: Arial, sans-serif; text-align: center; color: #000;">
  <h1 style="margin: 0; font-size: 24px;">Contact Us</h1>
  <hr style="margin: 20px 0; border: 0; height: 1px; background-color: #ccc;" />

  <div style="font-size: 16px; margin-bottom: 20px;">
    <a href="https://linkedin.com" style="margin: 0 10px; text-decoration: none; color: #000;">LinkedIn</a> |
    <a href="https://twitter.com" style="margin: 0 10px; text-decoration: none; color: #000;">X</a> |
    <a href="https://facebook.com" style="margin: 0 10px; text-decoration: none; color: #000;">Facebook</a> |
    <a href="https://instagram.com" style="margin: 0 10px; text-decoration: none; color: #000;">Instagram</a> |
    <a href="mailto:info@nesaafrica.org" style="margin: 0 10px; text-decoration: none; color: #000;">E-mail</a>
  </div>

  <hr style="margin: 20px 0; border: 0; height: 1px; background-color: #ccc;" />

  <p style="font-size: 14px; color: #333; margin: 0;">
    L19, MaxWell Okigbo Street off Alh Masha Rd, Surulere-Lagos, Nigeria
  </p>
</div>
    `;

    const mailOptions = {
      from: `"NESA-Africa" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Congratulations – You’re Approved as a Judge for NESA 2025!",
      html: htmlContent,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "assets", "logo.png"),
          cid: "logo",
        },
        {
          filename: "school.png",
          path: path.join(__dirname, "assets", "school.png"),
          cid: "img1",
        },
        {
          filename: "celebration.png",
          path: path.join(__dirname, "assets", "celebration.png"),
          cid: "img2",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Nomination email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
  }
};
