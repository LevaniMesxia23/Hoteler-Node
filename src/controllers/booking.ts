import { Request, Response } from "express";
import { createBookingSchema } from "../validators/booking";
import prisma from "../config/db";
import { Service } from "@prisma/client";
import { AuthenticatedRequest } from "../middlewares/auth";

export const createBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const result = createBookingSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid request body",
      error: result.error.message,
      success: false,
    });
    return;
  }

  const {
    userId,
    roomId,
    checkInDate,
    checkOutDate,
    adults,
    children,
    extraServiceIds,
  } = result.data;

  const conflict = await prisma.booking.findFirst({
    where: {
      roomId,
      OR: [
        {
          checkInDate: { lt: new Date(checkOutDate) },
          checkOutDate: { gt: new Date(checkInDate) },
        },
      ],
    },
  });

  if (conflict) {
    res.status(400).json({
      message: "Room is already booked for the selected dates",
    });
    return;
  }

  const nights = Math.ceil(
    (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  if (!room) {
    res.status(400).json({
      message: "Room not found",
    });
    return;
  }

  let total = room.pricePerNight * nights;

  let extras: Service[] = [];

  if (extraServiceIds && extraServiceIds.length) {
    extras = await prisma.service.findMany({
      where: {
        id: {
          in: extraServiceIds,
        },
      },
    });
    total += extras.reduce((acc, service) => acc + service.price, 0);
  }

  const booking = await prisma.booking.create({
    data: {
      userId: userId,
      roomId,
      checkInDate,
      checkOutDate,
      adults,
      children,
      totalPrice: total,
      extraServices: {
        create: extras.map((service) => ({
          name: service.name,
          price: service.price,
        })),
      },
    },
    include: {
      extraServices: true,
    },
  });

  res.status(201).json({
    message: "Booking created successfully",
    booking,
    success: true,
  });
};
