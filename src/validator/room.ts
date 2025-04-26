import { z } from "zod";
import {RoomType} from "@prisma/client"
export const createRoomSchema = z.object({
  roomNumber: z.string().min(1),
  type: z.nativeEnum(RoomType),
  pricePerNight: z.number().int().positive(),
  description: z.string().optional(),
  capacity: z.number().int().positive(),
  images: z.array(z.string().url()).optional(),
});



export const updateRoomSchema = createRoomSchema.partial();