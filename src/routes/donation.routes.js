import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
} from "../controllers/donation.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/",authenticate, createDonation);
router.get("/",authenticate, getAllDonations);
router.get("/:id",authenticate, getDonationById);
router.put("/:id",authenticate, updateDonation);
router.delete("/:id",authenticate, deleteDonation);

export default router;
