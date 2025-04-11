import mongoose from "mongoose";

const nomineeProfileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  achievements: [String],
  endorsements: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("NomineeProfile", nomineeProfileSchema);
