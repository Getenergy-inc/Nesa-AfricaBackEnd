import Wallet from "../models/postgresql/Wallet.js";
import User from "../models/postgresql/User.js";

/**
 * Create a new wallet for a user
 */
export const createWallet = async ({ user_id, email, phone, full_name }) => {
  try {
    // Check if user exists
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    // Check if user already has a wallet
    const existingWallet = await Wallet.findOne({ where: { user_id } });
    if (existingWallet) {
      return { status: 400, message: "User already has a wallet" };
    }

    // Create new wallet
    const wallet = await Wallet.create({
      user_id,
      balance: 0.0, // Default balance
      transaction_history: [], // Empty array for transactions
      referral_source: full_name || "N/A",
    });

    return {
      status: "success",
      wallet_id: wallet.id,
      balance: wallet.points_balance,
      created_at: wallet.createdAt,
    };
  } catch (error) {
    return { status: "error", message: "Failed to create wallet", error: error.message };
  }
};

/**
 * Get wallet List of User
 */


export const getWallets = async () => {
  try {
    const wallets = await Wallet.findAll();

    return {
      status: "success",
      data: wallets.map(wallet => ({
        wallet_id: wallet.id,
        balance: wallet.points_balance,
        created_at: wallet.createdAt
      }))
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to fetch wallets",
      error: error.message
    };
  }
};




/**
 * Get wallet balance by wallet_id
 */

export const getWalletBalance = async (id) => {
  try {
    const wallet = await Wallet.findOne({
      where: {id:id},
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return wallet;
  } catch (error) {
    throw new Error(error.message || "Error fetching wallet balance");
  }
};

  
  /**
   * Update wallet balance by wallet_id
   */
  export const updateWalletBalance = async (id, newBalance) => {
    try {
      const wallet = await Wallet.findOne({ where: { id } });
      if (!wallet) {
        throw new Error("Wallet not found");
      }
  
      // Update the wallet balance
      wallet.points_balance = newBalance;
      await wallet.save(); // Save the updated wallet
  
      return wallet;
    } catch (error) {
      throw new Error("Error updating wallet balance");
    }
  };

  // delete User Wallet

  export const deleteUserWallet = async (userId) => {
    try {
      const wallet = await Wallet.findOne({ where: { user_id: userId } });
  
      if (!wallet) {
        return { status: 404, message: "Wallet not found for this user" };
      }
  
      await wallet.destroy();
  
      return { status: 200, message: "Wallet deleted successfully" };
    } catch (error) {
      return { status: 500, message: "Error deleting wallet", error: error.message };
    }
  };