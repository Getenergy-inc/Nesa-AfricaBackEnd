import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Simplified
    console.log("✅ MongoDB Connected Successfully...");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

export default connectMongoDB;
