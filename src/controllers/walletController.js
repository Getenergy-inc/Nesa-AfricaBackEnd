import { createWallet, getWalletBalance, updateWalletBalance, getWallets, deleteUserWallet} from "../services/walletService.js";

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
    const { id } = req.params;
  
    try {
      const wallet = await getWalletBalance(id);
      if (!wallet) {
        return res.status(404).json({ status: "error", message: "Wallet not found" });
      }
  
      return res.status(200).json({
        status: "success",
        wallet_id: wallet.id,
        balance: wallet.points_balance,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Error fetching balance", error: error.message });
    }
  };
  
  /**
   * Update wallet balance
   */
  export const updateBalance = async (req, res) => {
    const { id } = req.params;
    const { points_balance } = req.body;
  
    try {
      const wallet = await updateWalletBalance(id, points_balance);
      if (!wallet) {
        return res.status(404).json({ status: "error", message: "Wallet not found" });
      }
  
      return res.status(200).json({
        status: "success",
        wallet_id: wallet.id,
        balance: wallet.points_balance,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: "Error updating balance", error: error.message });
    }
  };

  // delete Wallet Controller

  export const deleteWalletController = async (req, res) => {
    const { userId } = req.params;
  
    const result = await deleteUserWallet(userId);
    return res.status(result.status).json(result);
  };