import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from "../controllers/staff.controller.js";



const router = express.Router();

router.post("/staff",authenticate, createStaff);
router.get("/staff-list",authenticate, getAllStaff);
router.get("/staff/:id",authenticate, getStaffById);
router.put("/update/:id",authenticate, updateStaff);
router.delete("/delete/:id",authenticate, deleteStaff);

export default router;
