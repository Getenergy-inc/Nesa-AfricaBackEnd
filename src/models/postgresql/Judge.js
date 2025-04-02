import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Judge = sequelize.define("Judge", {

  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  application_id: { type: DataTypes.UUID, allowNull: false },
  assigned_categories: { type: DataTypes.JSON },
  logs: { type: DataTypes.JSON },
  current_status: { type: DataTypes.STRING },

});

export default Judge;
