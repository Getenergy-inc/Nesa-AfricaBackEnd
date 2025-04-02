import express from "express";
import { voteForNominee, getTopNominees } from "../controllers/leaderboardController.js";

const router = express.Router();

router.post("/vote", voteForNominee);  // Vote for a nominee
router.get("/top-nominees", getTopNominees);  // Get top nominees

export default router;
