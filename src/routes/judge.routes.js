import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createJudge,
  getAllJudges,
  getJudgeById,
  updateJudge,
  deleteJudge
} from "../controllers/judge.controller.js";



const router = express.Router();

router.post("/judge",authenticate, createJudge);
router.get("/judge-list",authenticate, getAllJudges);
router.get("/judge/:id", authenticate, getJudgeById);
router.put("/update/:id",authenticate, updateJudge);
router.delete("/delete/:id",authenticate, deleteJudge);

export default router;
