import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";
import User from "./User.js";

const Wallet = sequelize.define("Wallet", {

  wallet_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: "id" } },
  balance: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  transaction_history: { type: DataTypes.JSON },
  referral_source: { type: DataTypes.STRING },

});

export default Wallet;
