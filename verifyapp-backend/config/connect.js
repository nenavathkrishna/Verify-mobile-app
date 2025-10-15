import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let dbConnection = null;

const connectToDatabase = async () => {
  if (dbConnection) return dbConnection;

  try {
    dbConnection = await mongoose.connect(process.env.DB_URI);
    console.log("Database connected");
    return dbConnection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
