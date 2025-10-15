import serverlessExpress from "@vendia/serverless-express";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./config/connect.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("VerifyApp backend is running on Lambda!");
});

app.use(errorHandler);

// Connect to DB
connectToDatabase()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Export handler for Lambda
export const handler = serverlessExpress({ app });
