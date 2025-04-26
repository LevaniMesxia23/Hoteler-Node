import { Request, Response } from "express";
import prisma from "../config/db";
import { createRoomSchema, updateRoomSchema } from "../validator/room";

export const createRoom = async (req: Request, res: Response) => {
  const result = createRoomSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      formErrors: result.error.flatten().formErrors,
      fieldErrors: result.error.flatten().fieldErrors,
    });
    return;
  }
  const room = await prisma.room.create({
    data: result.data,
  });

  res.status(201).json({
    message: "Room created successfully",
    room,
  });
};

export const getAllRooms = async (req: Request, res: Response) => {
  const rooms = await prisma.room.findMany();
  res.status(200).json({ message: "Rooms fetched successfully", rooms });
};

export const getRoomById = async (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  if (!room) {
    res.status(404).json({
      message: "Room not found",
    });
    return;
  }
  res.status(200).json({
    message: "Room fetched successfully",
    room,
  });
};

export const updateRoom = async (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  const result = updateRoomSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      formErrors: result.error.flatten().formErrors,
      fieldErrors: result.error.flatten().fieldErrors,
    });
    return;
  }

  try {
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: { ...result.data },
    });

    res.status(200).json({
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(404).json({
      message: "Room not found",
    });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);

  try {
    const room = await prisma.room.delete({
      where: { id: roomId },
    });

    res.status(200).json({
      message: "Room deleted successfully",
      room,
    });
  } catch (error) {
    res.status(404).json({
      message: "Room not found",
    });
  }
};
