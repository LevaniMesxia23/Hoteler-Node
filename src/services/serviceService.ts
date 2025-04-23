import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createService = async (data: {
  name: string;
  description?: string;
  price: number;
  type: string;
  images: string[];
}) => {
  return prisma.service.create({ data });
};

export const updateService = async (id: number, data: any) => {
  return prisma.service.update({
    where: { id },
    data,
  });
};

export const deleteService = async (id: number) => {
  return prisma.service.delete({ where: { id } });
};

export const getAllServices = async () => {
  return prisma.service.findMany();
};

export default {
  createService,
  updateService,
  deleteService,
  getAllServices,
};
