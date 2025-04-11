import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
} from "../controllers/volunteer.controller.js";




const router = express.Router();

router.post("/",authenticate, createVolunteer);
router.get("/",authenticate, getAllVolunteers);
router.get("/:id",authenticate, getVolunteerById);
router.put("/:id",authenticate, updateVolunteer);
router.delete("/:id",authenticate, deleteVolunteer);

export default router;
