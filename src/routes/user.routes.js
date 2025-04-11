import express from "express";
import { getUsers, getUser, updateUserProfile, removeUser } from "../controllers/user.controller.js";
import {authenticate} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/user-list", authenticate, getUsers); // Get all users (Protected)
router.get("/:id", authenticate, getUser); // Get user by ID (Protected)
router.put("/update/:id", authenticate, updateUserProfile); // Update user (Protected)
router.delete("/delete/:id", authenticate, removeUser); // Delete user (Protected)

export default router;
