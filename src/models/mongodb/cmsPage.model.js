import mongoose from "mongoose";

const cmsPageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("CmsPage", cmsPageSchema);
