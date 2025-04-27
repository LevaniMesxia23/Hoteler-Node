import { Request, Response } from "express";
import prisma from "../config/db";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../validator/serviceService";

export const createService = async (req: Request, res: Response) => {
  const result = createServiceSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: result.error.flatten().fieldErrors,
    });
    return;
  }

  const service = await prisma.service.create({ data: result.data });
  res.status(201).json({ message: "Service created successfully", service });
};

export const getAllServices = async (req: Request, res: Response) => {
  const services = await prisma.service.findMany();
  res.status(200).json({ services });
};

export const updateService = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = updateServiceSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: result.error.flatten().fieldErrors,
    });
    return;
  }

  const updatedService = await prisma.service.update({
    where: { id },
    data: result.data,
  });

  res.status(200).json({
    message: "Service updated successfully",
    service: updatedService,
  });
};

export const deleteService = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.service.delete({ where: { id } });
  res.status(200).json({ message: "Service deleted successfully" });
};
