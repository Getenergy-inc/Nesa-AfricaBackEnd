import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis = null;

if (process.env.REDIS_URI) {
  redis = new Redis(process.env.REDIS_URI, {
    maxRetriesPerRequest: 1,      // Try only once per command
    connectTimeout: 3000,         // Fail faster if Redis is unreachable
    lazyConnect: true,            // Only connect when a command is issued
    enableOfflineQueue: false,     // Prevent commands queuing if not connected
  });

  redis.connect().then(() => {
    console.log("✅ Redis Connected Successfully...!");
  }).catch((err) => {
    console.error("❌ Redis Connection Failed:", err.message);
    redis = null; // Fallback to avoid using broken instance
  });

  redis.on("error", (err) => {
    console.error("❌ Redis Error:", err.message);
  });
} else {
  console.log("⚠️ Skipping Redis: REDIS_URI not set");
}

export default redis;
