// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectToDatabase from "./config/connect.js"
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

// routings
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("VerifyApp backend is running!");
});

app.use(errorHandler);

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

