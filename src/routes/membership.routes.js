import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
} from "../controllers/membership.controller.js";



const router = express.Router();

router.post("/membership",authenticate, createMembership);
router.get("/membership-list",authenticate, getAllMemberships);
router.get("/membership/:id",authenticate, getMembershipById);
router.put("/update/:id",authenticate, updateMembership);
router.delete("/delete/:id",authenticate, deleteMembership);

export default router;
