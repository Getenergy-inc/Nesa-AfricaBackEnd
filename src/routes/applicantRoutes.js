import express from "express";
import * as controller from "../controllers/applicantController.js";

const router = express.Router();

router.post("/applicant", controller.create);
router.get("/applicants", controller.findAll);
router.get("/applicants/:id", controller.findOne);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.remove);

export default router;
