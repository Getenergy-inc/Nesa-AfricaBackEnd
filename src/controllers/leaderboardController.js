import { updateLeaderboard, getLeaderboard } from "../services/leaderboardService.js";

/**
 * API Route: Add votes to a nominee
 */
export const voteForNominee = async (req, res) => {
  try {
    const { nomineeId, votes } = req.body;
    if (!nomineeId || !votes) {
      return res.status(400).json({ message: "Nominee ID and votes are required." });
    }

    await updateLeaderboard(nomineeId, votes);
    res.status(200).json({ message: "Vote added successfully!" });
  } catch (error) {
    console.error("❌ Error in voting process:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * API Route: Get top nominees from leaderboard
 */
export const getTopNominees = async (req, res) => {
  try {
    const { count } = req.query;
    const topNominees = await getLeaderboard(parseInt(count) || 10);
    res.status(200).json(topNominees);
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
