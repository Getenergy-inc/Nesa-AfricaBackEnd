import express from "express";
import NominationController from "../controllers/nominationController.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-nominate", authenticate, NominationController.create);      // Create nomination
router.get("/nominate-list",authenticate, NominationController.getAll);       // Get all nominations
router.get("/:id",authenticate, NominationController.getById);   // Get nomination by ID
router.put("/update/:id", authenticate,NominationController.update);    // Update nomination
router.delete("/delete/:id",authenticate, NominationController.delete); // Delete nomination

export default router;
