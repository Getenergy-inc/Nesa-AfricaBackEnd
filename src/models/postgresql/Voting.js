import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";
import User from "./User.js";

const Voting = sequelize.define("Voting", {

  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, references: { model: User, key: "id" } },
  nominee_id: { type: DataTypes.UUID },
  voting_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  votes_used: { type: DataTypes.INTEGER, defaultValue: 1 },
  referral_bonus: { type: DataTypes.INTEGER, defaultValue: 0 },

});

export default Voting;
