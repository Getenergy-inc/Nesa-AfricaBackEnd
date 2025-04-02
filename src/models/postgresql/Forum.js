import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";

const Forum = sequelize.define("Forum", {

  forum_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  topic: { type: DataTypes.STRING, allowNull: false },
  region_chapter_id: { type: DataTypes.UUID, allowNull: false },
  participants: { type: DataTypes.JSON },
  messages: { type: DataTypes.JSON },
  
});

export default Forum;
