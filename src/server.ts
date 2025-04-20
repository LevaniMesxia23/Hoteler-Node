import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
dotenv.config();

const app = express();

export const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

app.use("/api/auth", authRoutes);
