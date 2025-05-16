import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import Wallet from "./Wallet.js";

const WalletTransaction = sequelize.define("WalletTransaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  wallet_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Wallet,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  type: {
    type: DataTypes.ENUM("credit", "debit"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  balance_after_transaction: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: "wallet_transactions",
  timestamps: true, // createdAt and updatedAt
});

export default WalletTransaction;
