import { Request, Response } from "express";
import prisma from "../config/db";
import { createStaffSchema, updateStaffSchema } from "../validator/staff";

export const createStaff = async (req: Request, res: Response) => {
  const result = createStaffSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid request body",
      success: false,
      error: result.error.flatten().fieldErrors,
    });
    return;
  }

  const staff = await prisma.staff.create({ data: result.data });
  res.status(201).json({ message: "Service created successfully", staff });
};

export const getallStaff = async (req: Request, res: Response) => {
  const staff = await prisma.staff.findMany({ orderBy: { createdAt: "desc" } });
  res.status(201).json({ staff });
};

export const updateStaff = async (req: Request, res: Response) => {
  const StaffId = Number(req.params.id);
  const result = updateStaffSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid request body",
      success: false,
      error: result.error.flatten().fieldErrors,
    });
    return;
  }

  const exists = await prisma.staff.findUnique({ where: { id: StaffId } });
  if (!exists) {
    res.status(404).json({
      message: "Staff not found",
      success: false,
    });
    return;
  }

  const updatedStaff = await prisma.staff.update({
    where: { id: StaffId },
    data: result.data,
  });
  res.status(200).json({
    message: "Staff updated successfully",
    success: true,
    staff: updatedStaff,
  });
};

export const deleteStaff = async (req: Request, res: Response) => {
  const StaffId = Number(req.params.id);

  const exists = await prisma.staff.findUnique({ where: { id: StaffId } });
  if (!exists) {
    res.status(404).json({
      message: "Staff not found",
      success: false,
    });
    return;
  }
  const deletedStaff = await prisma.staff.delete({ where: { id: StaffId } });
  res
    .status(200)
    .json({
      message: "Staff deleted successfully",
      success: true,
      staff: deletedStaff,
    });
};
