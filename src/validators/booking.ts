import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.number().int(),
  roomId: z.number().int(),
  checkInDate: z.string().datetime(),
  checkOutDate: z.string().datetime(),
  adults: z.number().int().positive(),
  children: z.number().int().positive(),
  extraServiceIds: z.array(z.number().int()).optional(),
});


