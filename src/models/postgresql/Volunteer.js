import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Volunteer = sequelize.define("Volunteer", {

  volunteer_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  location: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  milestone_log: { type: DataTypes.JSON },
  
});

export default Volunteer;
