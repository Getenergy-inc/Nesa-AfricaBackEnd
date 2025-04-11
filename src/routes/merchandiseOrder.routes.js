import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  createMerchandiseOrder,
  getAllMerchandiseOrders,
  getMerchandiseOrderById,
  updateMerchandiseOrder,
  deleteMerchandiseOrder,
} from "../controllers/merchandiseOrder.controller.js";



const router = express.Router();

router.post("/merchandise",authenticate, createMerchandiseOrder);
router.get("/merchandise-list",authenticate, getAllMerchandiseOrders);
router.get("/merchandise/:id",authenticate, getMerchandiseOrderById);
router.put("/update/:id",authenticate, updateMerchandiseOrder);
router.delete("/delete/:id",authenticate, deleteMerchandiseOrder);

export default router;
