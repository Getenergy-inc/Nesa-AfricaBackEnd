import mongoose from "mongoose";

const forumDiscussionSchema = new mongoose.Schema({
  title: String,
  participants: [String],
  messages: [
    {
      sender: String,
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  category: String // e.g., "Community", "LCP Meeting"
});

export default mongoose.model("ForumDiscussion", forumDiscussionSchema);
