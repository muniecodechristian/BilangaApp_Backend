import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://fatshiemploi_db_user:1a1oJr1PzTO43GqB@cluster0.lsfavcb.mongodb.net/');
    console.log("Connected to DB SUCCESSFULLY ✅ ");
  } catch (error) {
    console.log("Error connecting to MONGODB");
    process.exit(1);
  }
};
