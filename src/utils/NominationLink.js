import jwt from "jsonwebtoken";
import Nomination from "../models/postgresql/Nomination.js";

class NominationLink {
  /**
   * Verifies a token and updates the nomination status to "accepted"
   * @param {string} token - JWT token containing nominationId
   * @returns {Promise<{ success: boolean, message: string, nominationId?: string }>}
   */
  static async verifyNominationToken(token) {
    if (!token) {
      return { success: false, message: "Token is required" };
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;

      const [updated] = await Nomination.update(
        { status: "accepted" },
        { where: { email: email } }
      );

      if (updated === 0) {
        return { success: false, message: "Nomination not found or already accepted." };
      }

      return {
        success: true,
        message: "Nomination successfully accepted.",
        email,
      };
    } catch (err) {
      return { success: false, message: "Invalid or expired token" };
    }
  }
}

export default NominationLink;
