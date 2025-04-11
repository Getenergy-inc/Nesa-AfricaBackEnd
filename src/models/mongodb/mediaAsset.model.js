import mongoose from "mongoose";

const mediaAssetSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['image', 'video'] },
  url: String,
  uploadedBy: String,
  category: String, // e.g., "NESA TV", "Promo", etc.
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("MediaAsset", mediaAssetSchema);
