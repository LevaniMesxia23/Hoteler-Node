import { z } from "zod";

export const createStaffSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  bio: z.string().optional(),
  photoUrl: z.string().url().optional(),
});


export const updateStaffSchema = createStaffSchema.partial();