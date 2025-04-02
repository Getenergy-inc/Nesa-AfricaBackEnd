import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";
import User from "../User.js";

const Nomination = sequelize.define("Nomination", {

  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: "id" } },
  category_id: { type: DataTypes.UUID, allowNull: false },
  competitive_type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
  
});

export default Nomination;
