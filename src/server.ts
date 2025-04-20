import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

export const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};
