import express from "express";
import upload from "../config/multer.js";
import NominationController from "../controllers/nominationController.js";
import { authenticate } from "../middleware/auth.middleware.js";
import NominationLink from "../utils/NominationLink.js";

const router = express.Router();

// Use upload.any() to accept files from any field names
router.post("/create-nominate", authenticate, upload.any(), NominationController.create);
router.get("/nominate-list", authenticate, NominationController.getAll);
router.get("/:id", authenticate, NominationController.getById);
router.put("/update/:id", authenticate, upload.any(), NominationController.update);
router.delete("/delete/:id", authenticate, NominationController.delete);
router.get("/verify", NominationLink.verifyNominationToken);

export default router;
