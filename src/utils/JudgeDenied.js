import Applicant from "../models/postgresql/Applicant.js";

class JudgeDenied {
  /**
   * Approves a judge application by applicant ID
   * @param {string} applicantId - UUID of the applicant
   * @returns {Promise<{ success: boolean, message: string, id?: string }>}
   */
  static async JudgeDenied(applicantId) {
  if (!applicantId) {
    return { success: false, message: "Applicant ID is required" };
  }

  try {
    const [updated] = await Applicant.update(
      { status: "denied" },
      { where: { id: applicantId } }
    );

    if (updated === 0) {
      return {
        success: false,
        message: "Applicant not found or already denied.",
      };
    }

    return {
      success: true,
      message: "Judge application successfully denied.",
      id: applicantId,
    };
  } catch (err) {
    return {
      success: false,
      message: "An error occurred while denying the applicant.",
      error: err.message,
    };
  }
}

}

export default JudgeDenied;
