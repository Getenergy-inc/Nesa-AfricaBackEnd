import * as VotingService from "../services/voting.service.js";





// Create a vote
export const createVote = async (req, res) => {
  try {
    const vote = await VotingService.createVote(req.body);
    res.status(201).json({ message: "Vote created successfully", data: vote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all votes
export const getAllVotes = async (req, res) => {
  try {
    const votes = await VotingService.getAllVotes();
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single vote by ID
export const getVoteById = async (req, res) => {
  try {
    const vote = await VotingService.getVoteById(req.params.id);
    res.status(200).json(vote);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a vote
export const updateVote = async (req, res) => {
  try {
    const vote = await VotingService.updateVote(req.params.id, req.body);
    res.status(200).json({ message: "Vote updated successfully", data: vote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a vote
export const deleteVote = async (req, res) => {
  try {
    await VotingService.deleteVote(req.params.id);
    res.status(200).json({ message: "Vote deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
