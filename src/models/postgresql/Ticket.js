import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";
import User from "../User.js";

const Ticket = sequelize.define("Ticket", {

  ticket_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: "id" } },
  ticket_type: { type: DataTypes.STRING, allowNull: false },
  QR_code: { type: DataTypes.STRING, unique: true },
  event: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

});

export default Ticket;
