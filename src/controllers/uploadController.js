import cloudinary from "../config/cloudinary.js";
import User from "../models/postgresql/User.js";

const uploadImage = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_uploads", // Optional: Organize uploads into a folder
    });

    // Save to database
    const user = await User.create({
      name: req.body.name,
      image: result.secure_url, // Save image URL
    });

    res.json({ message: "Image uploaded successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
};

export { uploadImage };
