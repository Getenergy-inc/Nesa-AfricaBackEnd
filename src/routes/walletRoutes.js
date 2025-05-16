import express from "express";
import { createWalletController , getBalance, updateBalance, getWalletController, deleteWalletController} from "../controllers/walletController.js";
import { authenticate } from "../middleware/auth.middleware.js";



const router = express.Router();

// Create Wallet Route
router.post("/wallets/create",authenticate, createWalletController);
router.get("/wallets/wallet/:id",authenticate, getBalance);
router.put("/wallets/update/:id",authenticate, updateBalance);
router.get("/wallets/wallet-list", authenticate,getWalletController)
router.delete("/wallet/delete/:userId", authenticate ,deleteWalletController);

export default router;
