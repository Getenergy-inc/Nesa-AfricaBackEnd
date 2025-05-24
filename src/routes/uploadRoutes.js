import express from "express";
import multer from "multer";
import { uploadImageToGCS } from "../services/uploadService.js";

const router = express.Router();

// Temp folder for uploaded files
const upload = multer({ dest: "temp_uploads/" });

// Upload endpoint
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = await uploadImageToGCS(req.file.path);
    res.json({ success: true, imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
});

export default router;
