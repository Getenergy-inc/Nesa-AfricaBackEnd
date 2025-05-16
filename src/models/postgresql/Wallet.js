import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import User from "./User.js";

const Wallet = sequelize.define("Wallet", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true, // ensures one wallet per user
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  points_balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "wallets",
  timestamps: true, // adds createdAt and updatedAt
});

export default Wallet;
