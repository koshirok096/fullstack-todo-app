import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import taskRoutes from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const connect = async () => {
  try {
    await mongoose.connect (process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
  console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(8000, () => {
  connect();
  console.log("Server listening on port 8000!");
});


