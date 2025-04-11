import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createReferral,
  getAllReferrals,
  getReferralById,
  updateReferral,
  deleteReferral,
} from "../controllers/referral.controller.js";



const router = express.Router();

router.post("/referral",authenticate, createReferral);
router.get("/referral-list",authenticate, getAllReferrals);
router.get("/referral/:id",authenticate, getReferralById);
router.put("/update/:id",authenticate, updateReferral);
router.delete("/delete/:id",authenticate, deleteReferral);

export default router;
