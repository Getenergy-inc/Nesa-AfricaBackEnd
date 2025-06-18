import Applicant from "../models/postgresql/Applicant.js";

class JudgeApproved {
  /**
   * Approves a judge application by applicant ID
   * @param {string} applicantId - UUID of the applicant
   * @returns {Promise<{ success: boolean, message: string, id?: string }>}
   */
  static async JudgeApproved(applicantId) {
    if (!applicantId) {
      return { success: false, message: "Applicant ID is required" };
    }

    try {
      // Optional: Ensure applicant exists before update
      const applicant = await Applicant.findByPk(applicantId);

      if (!applicant) {
        return {
          success: false,
          message: "Applicant not found.",
        };
      }

      if (applicant.status === "approved") {
        return {
          success: false,
          message: "Applicant has already been approved.",
        };
      }

      applicant.status = "approved";
      await applicant.save();

      return {
        success: true,
        message: "Judge application successfully approved.",
        id: applicantId,
      };
    } catch (err) {
      console.error("❌ Error approving applicant:", err); // log error for debugging
      return {
        success: false,
        message: "An error occurred while approving the applicant.",
        error: err.message, // Optional: add for API visibility
      };
    }
  }
}

export default JudgeApproved;
