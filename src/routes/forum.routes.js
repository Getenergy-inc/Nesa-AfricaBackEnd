import express from "express";
import {
  createForum,
  getAllForums,
  getForumById,
  updateForum,
  deleteForum
} from "../controllers/forum.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/forum",authenticate, createForum);
router.get("/forum-list", authenticate, getAllForums);
router.get("/forum/:id",authenticate, getForumById);
router.put("/update/:id",authenticate, updateForum);
router.delete("/delete/:id",authenticate, deleteForum);

export default router;
