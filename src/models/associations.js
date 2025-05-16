import Wallet from "./postgresql/Wallet.js";
import WalletTransaction from "./postgresql/WalletTransaction.js";
import Referral from "./postgresql/Referral.js";
import Nomination from "./postgresql/Nomination.js";
import User from "./postgresql/User.js";



// const someReferralId = Referral.referral_id;

// Associations
Wallet.hasMany(WalletTransaction, {
  foreignKey: "wallet_id",
  as: "transactions",
});

WalletTransaction.belongsTo(Wallet, {
  foreignKey: "wallet_id",
  as: "wallet",
});

// Referral → User (referrer)
Referral.belongsTo(User, {
  foreignKey: "referred_by",
  as: "referrer", // alias used in query includes
});

User.hasMany(Referral, {
  foreignKey: "referred_by",
  as: "referrals",
});


  // Associations for Nomination and User
Nomination.belongsTo(User, { foreignKey: "user_id" });  // Each nomination belongs to one user
User.hasMany(Nomination, { foreignKey: "user_id" });  // One user can have many nominations

  

export {
  Wallet,
  WalletTransaction,
  Referral,
  Nomination,
  User,
};
