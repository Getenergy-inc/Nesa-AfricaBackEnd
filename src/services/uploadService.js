import { bucket } from "../config/googleCloudStorage.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

export const uploadImageToGCS = async (filePath, destinationFolder = "profile_images") => {
  const filename = `${destinationFolder}/${uuidv4()}-${path.basename(filePath)}`;
  const file = bucket.file(filename);

  await bucket.upload(filePath, {
    destination: file,
    public: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  // Delete temp local file if needed
  fs.unlinkSync(filePath);

  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
};
