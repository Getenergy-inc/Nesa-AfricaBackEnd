import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Referral = sequelize.define("Referral", {

  referral_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  referred_by: { type: DataTypes.UUID, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  
});

export default Referral;
