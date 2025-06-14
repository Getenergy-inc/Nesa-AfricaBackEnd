import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";



const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nomineeType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stateOrRegion: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING // Can store file path or URL
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
}, {
  tableName: "Users", // optional: name of the table
  timestamps: true
});


export default User;
