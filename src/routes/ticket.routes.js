import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket.controller.js";



const router = express.Router();

router.post("/ticket",authenticate, createTicket);
router.get("/ticket-list",authenticate, getAllTickets);
router.get("/ticket/:id",authenticate, getTicketById);
router.put("/update/:id",authenticate, updateTicket);
router.delete("/delete/:id",authenticate, deleteTicket);

export default router;
