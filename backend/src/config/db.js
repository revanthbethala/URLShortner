import mongoose from "mongoose";
import { Log } from "../middleware/logger.js";

export function connectDB() {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    Log("backend", "info", "db", "Connected to DB ");
  } catch (err) {
    Log("backend", "error", "db", "Failed to connect to db");
  }
}
