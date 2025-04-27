import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(["spa", "restaurant", "fitness"]),
  price: z.number().int().positive(),
  images: z.array(z.string().url().min(1)),
});

export const updateServiceSchema = createServiceSchema.partial();
