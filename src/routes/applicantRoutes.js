import express from "express";
import upload from "../config/multer.js";
import ApplicantController from "../controllers/applicantController.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Use upload.any() to accept files from any field names
router.post("/applicant", authenticate, upload.any(), ApplicantController.create);
// router.get("/applicants", authenticate, ApplicantController.findAll);
// router.get("/applicants/:id", authenticate, ApplicantController.findOne);
// router.put("/update/:id", authenticate, upload.any(), ApplicantController.update);
// router.delete("/delete/:id", authenticate, ApplicantController.remove);

export default router;
