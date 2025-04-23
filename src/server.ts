import express, { urlencoded } from "express";
import router from "./services/serviceRoutes";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const body = req.body;
  res.status(200).json({ message: "Hello World" });
});

app.post("/services/product", (req, res) => {
  const body = req.body;
  res.status(201).json({ message: "Data received", data: body });
});
app.get("/services/product", (req, res) => {
  const body = req.body;
  res.status(200).json({ message: "Data add", data: body });
});
// ✅ ეს დასასრულია
app.use("/services", router); // ⬅️ ეს რომ არ იყოს, ვერ იპოვის /services

export default app;
