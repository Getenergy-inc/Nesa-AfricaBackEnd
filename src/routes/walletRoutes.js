import express from "express";
import { createWalletController , getBalance, updateBalance, getWalletController} from "../controllers/walletController.js";
import { authenticate } from "../middleware/auth.middleware.js";



const router = express.Router();

// Create Wallet Route
router.post("/wallets/create",authenticate, createWalletController);
router.get("/wallets/:wallet_id/balance",authenticate, getBalance);
router.patch("/wallets/:wallet_id/balance",authenticate, updateBalance);
router.get("/wallets/wallet-list", authenticate,getWalletController)

export default router;
