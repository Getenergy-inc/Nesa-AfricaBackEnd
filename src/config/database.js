import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const databaseUrl = process.env.POSTGRES_URI;

if (!databaseUrl) {
  throw new Error("❌ POSTGRES_URI is not defined in the .env file.");
}

// Initialize Sequelize (but don't sync models here)
export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false, // Set to true for debugging SQL queries
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully.");

    // Import models after sequelize is initialized
    const { Role } = await import("../models/index.js");

    // Sync models
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced.");

    // Seed roles
    const { seedRoles } = await import("../seeds/seedRoles.js");
    await seedRoles();

  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};
