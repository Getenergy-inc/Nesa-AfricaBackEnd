import Wallet from "./postgresql/Wallet.js";
import WalletTransaction from "./postgresql/WalletTransaction.js";
import Referral from "./postgresql/Referral.js";
import Nomination from "./postgresql/Nomination.js";
import User from "./postgresql/User.js";
import NominationForm from './postgresql/NominationForm.js';



// const someReferralId = Referral.referral_id;
Wallet.hasMany(WalletTransaction, {
  foreignKey: "wallet_id",
  as: "transactions",
});

WalletTransaction.belongsTo(Wallet, {
  foreignKey: "wallet_id",
  as: "wallet",
});

// ✅ User → Wallet (new association with cascade delete)
User.hasOne(Wallet, {
  foreignKey: "user_id",
  as: "wallet",
  onDelete: "CASCADE",
  hooks: true,
});

Wallet.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});

// Referral → User (referrer)
Referral.belongsTo(User, {
  foreignKey: "referred_by",
  as: "referrer",
});

User.hasMany(Referral, {
  foreignKey: "referred_by",
  as: "referrals",
});

// Nomination → User
Nomination.belongsTo(User, { 
  foreignKey: "user_id" 
});
User.hasMany(Nomination, { 
  foreignKey: "user_id" 
  
});

Nomination.hasMany(NominationForm, {
  foreignKey: "nomination_id",
  as: "forms",
  onDelete: "CASCADE"
});

// Each NominationForm belongs to a single Nomination
NominationForm.belongsTo(Nomination, {
  foreignKey: "nomination_id",
  as: "nomination"
});


export {
  Wallet,
  WalletTransaction,
  Referral,
  Nomination,
  NominationForm,
  User,
};
