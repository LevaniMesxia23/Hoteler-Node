import express, { urlencoded, Request, Response, NextFunction } from "express";
import bookingRoutes from "./routes/booking";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.log(err.message);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

app.use("/api/bookings", bookingRoutes);

export default app; 