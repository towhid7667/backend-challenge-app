import * as Redis from "redis";
let redisClient: Redis.RedisClientType;

if (process.env.NODE_ENV === "production") {
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is not set in the environment");
  }
  redisClient = Redis.createClient({
    url: process.env.REDIS_URL,
  });
} else {
  redisClient = Redis.createClient({
    url: process.env.REDIS_URL || "redis://redis:6379", // Fallback for local development
  });
}
redisClient.on("error", (err: Error) => console.log("Redis Client Error", err));
redisClient.connect();

export default redisClient;
