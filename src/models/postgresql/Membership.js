import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Membership = sequelize.define("Membership", {

  user_id: { type: DataTypes.UUID, allowNull: false },
  level: { type: DataTypes.STRING, allowNull: false },
  chapter_link: { type: DataTypes.STRING },
  dues: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  ambassador_tier: { type: DataTypes.STRING },
  
});

export default Membership;
