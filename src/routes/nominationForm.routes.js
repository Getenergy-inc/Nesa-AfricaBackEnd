import express from "express";
import controller from "../controllers/nominationForm.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",authenticate, controller.create);
router.get("/nomination-form/list",authenticate, controller.getAll);
router.get("/nomination-form/get/:id",authenticate, controller.getOne);
router.put("/nomination-form/update/:id",authenticate, controller.update);
router.delete("/nomination-form/delete/:id",authenticate, controller.delete);

export default router;
