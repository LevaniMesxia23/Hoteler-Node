import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.POST || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
