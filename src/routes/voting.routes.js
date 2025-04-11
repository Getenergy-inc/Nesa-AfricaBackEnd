import express from "express";
import * as VotingController from "../controllers/voting.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";


const router = express.Router();



router.post("/vote", authenticate, VotingController.createVote);         // Create
router.get("/votes-list", authenticate, VotingController.getAllVotes);         // Read all
router.get("/vote/:id",authenticate, VotingController.getVoteById);      // Read one
router.put("/update/:id",authenticate, VotingController.updateVote);       // Update
router.delete("/delete/:id",authenticate, VotingController.deleteVote);    // Delete

export default router;
