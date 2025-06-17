import jwt from "jsonwebtoken";
import Applicant from "../models/postgresql/Applicant.js";

class ApplicantLink {
  /**
   * Verifies a token and updates the applicant's status to "accepted"
   * @param {string} token - JWT token containing applicant email
   * @returns {Promise<{ success: boolean, message: string, email?: string }>}
   */
  static async verifyApplicantToken(token) {
    if (!token) {
      return { success: false, message: "Token is required" };
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;

      const [updated] = await Applicant.update(
        { status: "accepted" },
        { where: { email } }
      );

      if (updated === 0) {
        return {
          success: false,
          message: "Applicant not found or already accepted.",
        };
      }

      return {
        success: true,
        message: "Applicant successfully accepted.",
        email,
      };
    } catch (err) {
      return { success: false, message: "Invalid or expired token" };
    }
  }
}

export default ApplicantLink;
