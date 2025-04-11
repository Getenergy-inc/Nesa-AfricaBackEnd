import Voting from "../models/postgresql/Voting.js";
import User from "../models/postgresql/User.js";





export const createVote = async (data) => {
  try {
    // Validation
    if (!data.user_id || !data.nominee_id) {
      throw new Error("user_id and nominee_id are required");
    }

    if (data.votes_used && data.votes_used < 1) {
      throw new Error("votes_used must be at least 1");
    }

    if (data.referral_bonus && data.referral_bonus < 0) {
      throw new Error("referral_bonus cannot be negative");
    }

    // Ensure user exists
    const user = await User.findByPk(data.user_id);
    if (!user) {
      throw new Error("User not found");
    }

    const vote = await Voting.create(data);
    return vote;
  } catch (error) {
    throw new Error(`Error creating vote: ${error.message}`);
  }
};

export const getAllVotes = async () => {
  try {
    return await Voting.findAll();
  } catch (error) {
    throw new Error("Error fetching votes");
  }
};

export const getVoteById = async (id) => {
  try {
    const vote = await Voting.findByPk(id);
    if (!vote) {
      throw new Error("Vote not found");
    }
    return vote;
  } catch (error) {
    throw new Error(`Error fetching vote: ${error.message}`);
  }
};

export const updateVote = async (id, data) => {
  try {
    const vote = await Voting.findByPk(id);
    if (!vote) {
      throw new Error("Vote not found");
    }

    // Optional validation if updating values
    if (data.votes_used && data.votes_used < 1) {
      throw new Error("votes_used must be at least 1");
    }

    if (data.referral_bonus && data.referral_bonus < 0) {
      throw new Error("referral_bonus cannot be negative");
    }

    // Ensure updated user still exists
    if (data.user_id) {
      const user = await User.findByPk(data.user_id);
      if (!user) {
        throw new Error("User not found");
      }
    }

    await vote.update(data);
    return vote;
  } catch (error) {
    throw new Error(`Error updating vote: ${error.message}`);
  }
};

export const deleteVote = async (id) => {
  try {
    const deleted = await Voting.destroy({ where: { id } });
    if (!deleted) {
      throw new Error("Vote not found or already deleted");
    }
    return true;
  } catch (error) {
    throw new Error(`Error deleting vote: ${error.message}`);
  }
};
