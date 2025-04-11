import { createWallet, getWalletBalance, updateWalletBalance, getWallets} from "../services/walletService.js";

/**
 * Handle wallet creation request
 */
export const createWalletController = async (req, res) => {
  try {
    const { user_id, email, phone, full_name } = req.body;

    // Validate required fields
    if (!user_id || !email || !phone || !full_name) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const response = await createWallet({ user_id, email, phone, full_name });

    if (response.status === "success") {
      return res.status(201).json(response);
    }

    return res.status(400).json(response);
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
  }
};



/**
 * Handle wallet creation request
 */
export const getWalletController = async (req, res) => {
  try {
    

    const response = await getWallets();

    if (response.status === "success") {
      return res.status(200).json(response);
    }

    return res.status(400).json(response);
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });
  }
};



/**
 * Get wallet balance
 */
export const getBalance = async (req, res) => {
    const { wallet_id } = req.params;
  
    try {
      const wallet = await getWalletBalance(wallet_id);
      if (!wallet) {
        return res.status(404).json({ status: "error", message: "Wallet not found" });
      }
  
      return res.status(200).json({
        status: "success",
        wallet_id: wallet.wallet_id,
        balance: wallet.balance,
        currency: wallet.currency,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Error fetching balance", error: error.message });
    }
  };
  
  /**
   * Update wallet balance
   */
  export const updateBalance = async (req, res) => {
    const { wallet_id } = req.params;
    const { balance } = req.body;
  
    try {
      const wallet = await updateWalletBalance(wallet_id, balance);
      if (!wallet) {
        return res.status(404).json({ status: "error", message: "Wallet not found" });
      }
  
      return res.status(200).json({
        status: "success",
        wallet_id: wallet.wallet_id,
        balance: wallet.balance,
        currency: wallet.currency,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Error updating balance", error: error.message });
    }
  };