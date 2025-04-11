import express from "express";
import * as AmbassadorController from "../controllers/AmbassadorController.js";
import { authenticate } from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/ambassador",authenticate, AmbassadorController.create);
router.get("/ambassadors-list",authenticate, AmbassadorController.getAll);
router.get("/ambassador/:id",authenticate, AmbassadorController.getById);
router.put("/update/:id",authenticate, AmbassadorController.update);
router.delete("/delete/:id",authenticate, AmbassadorController.remove);

export default router;
