import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnectionString: string = process.env.DB_CONNECTION_STRING as string;

const connectDB = async () => {
  try {
    await mongoose.connect(dbConnectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
