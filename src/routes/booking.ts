import express from "express";
import { createBooking, getBookings, cancelBooking } from "../controllers/booking";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.delete("/:id", cancelBooking);

export default router;