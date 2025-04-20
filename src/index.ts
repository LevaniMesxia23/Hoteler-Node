import express, { urlencoded } from "express";
import dotenv from "dotenv";
import serviceRoutes from "./servicies/serviceRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/services", serviceRoutes);

export default app;
