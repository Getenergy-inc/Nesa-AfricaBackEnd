import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

// Initialize GCS (no need to pass keyFilename if GOOGLE_APPLICATION_CREDENTIALS is set)
const storage = new Storage(); 
const bucketName = process.env.GCS_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

export const uploadToGCS = async (localPath, folder = "nominations") => {
  return new Promise((resolve, reject) => {
    const fileName = `${folder}/${uuidv4()}-${path.basename(localPath)}`;
    const file = bucket.file(fileName);

    fs.createReadStream(localPath)
      .pipe(
        file.createWriteStream({
          resumable: false,
          gzip: true,
          contentType: "auto",
          public: true,
        })
      )
      .on("error", (err) => reject(err))
      .on("finish", async () => {
        try {
          await file.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
          fs.unlinkSync(localPath); // optional: delete file after upload
          resolve(publicUrl);
        } catch (e) {
          reject(e);
        }
      });
  });
};
