import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import User from "../postgresql/User.js";

const Nomination = sequelize.define("Nomination", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: { model: User, key: "id" },
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  competitive_type: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true, // temporarily allow nulls
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true, // temporarily allow nulls
    validate: {
      isEmail: true,
    },
  },
  
});

export default Nomination;
