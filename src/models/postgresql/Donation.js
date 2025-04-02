import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Donation = sequelize.define("Donation", {

  donor_id: { type: DataTypes.UUID, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  channel: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  allocated_to: { type: DataTypes.STRING },

});

export default Donation;
