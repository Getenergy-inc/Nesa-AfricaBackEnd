import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import User from "./User.js";


const NominationForm = sequelize.define("NominationForm", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
            isEmail: true,
        },
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Nominated Category",
    },
    subCategory: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Nominated Sub-Category",
    },
    aboutYourself: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Tell us about yourself",
    },
    contributionImage: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Upload image of contribution",
    },
    achievementOrCollaboration: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Achievements or Collaborations",
    },
}, {
    tableName: "NominationForms", // ✅ Table name changed here
    timestamps: true,
});

export default NominationForm;
