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
      const [updated] = await Applicant.update(
        { status: "approved" },
        { where: { id: applicantId } }
      );

      if (updated === 0) {
        return {
          success: false,
          message: "Applicant not found or already approved.",
        };
      }

      return {
        success: true,
        message: "Judge application successfully approved.",
        id: applicantId,
      };
    } catch (err) {
      return { success: false, message: "An error occurred while approving the applicant." };
    }
  }
}

export default JudgeApproved;
