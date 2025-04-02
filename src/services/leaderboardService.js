import redis from "../config/redis.js";

/**
 * Increment votes for a nominee in the leaderboard.
 * @param {string} nomineeId - The nominee's unique ID.
 * @param {number} votes - Number of votes to add.
 */
export const updateLeaderboard = async (nomineeId, votes) => {
  try {
    await redis.zincrby("leaderboard", votes, nomineeId);
    console.log(`✅ Updated leaderboard: Nominee ${nomineeId} received ${votes} votes.`);
  } catch (error) {
    console.error("❌ Error updating leaderboard:", error);
  }
};

/**
 * Get the top nominees from the leaderboard.
 * @param {number} count - Number of top nominees to retrieve.
 * @returns {Promise<Array>} - List of top nominees with scores.
 */
export const getLeaderboard = async (count = 10) => {
  try {
    const leaderboard = await redis.zrevrange("leaderboard", 0, count - 1, "WITHSCORES");
    const formattedLeaderboard = [];
    
    for (let i = 0; i < leaderboard.length; i += 2) {
      formattedLeaderboard.push({ nomineeId: leaderboard[i], votes: parseInt(leaderboard[i + 1]) });
    }
    
    return formattedLeaderboard;
  } catch (error) {
    console.error("❌ Error retrieving leaderboard:", error);
    return [];
  }
};
