import mongoose from "mongoose";
//
export const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};
