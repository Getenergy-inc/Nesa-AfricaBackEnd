import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";



const User = sequelize.define("User", {

  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },  // Store role as string
  referral: { type: DataTypes.STRING },
  region: { type: DataTypes.STRING },
  KYC: { type: DataTypes.BOOLEAN, defaultValue: false },
  GFA_wallet_id: { type: DataTypes.UUID },

});


export default User;
