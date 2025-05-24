import express from "express";
import upload from "../config/multer.js";
import NominationController from "../controllers/nominationController.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" }); // configure as needed

router.post("/create-nominate", authenticate, upload.array("documents", 5), NominationController.create);      
router.get("/nominate-list", authenticate, NominationController.getAll);
router.get("/:id", authenticate, NominationController.getById);
router.put("/update/:id", authenticate, upload.array("documents", 5), NominationController.update);
router.delete("/delete/:id", authenticate, NominationController.delete);

export default router;
