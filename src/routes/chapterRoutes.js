import express from "express";
import * as ChapterController from "../controllers/ChapterController.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authenticate, ChapterController.create);
router.get("/", authenticate, ChapterController.findAll);
router.get("/:chapter_id",authenticate, ChapterController.findOne);
router.put("/:chapter_id",authenticate, ChapterController.update);
router.delete("/:chapter_id",authenticate, ChapterController.remove);

export default router;
