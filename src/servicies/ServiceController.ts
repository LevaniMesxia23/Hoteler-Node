import { Request, Response } from "express";
import {
  createService as createServiceDB,
  updateService as updateServiceDB,
  deleteService as deleteServiceDB,
  getAllServices as getAllServicesDB,
} from "./serviceService"; 


export const createService = async (req: Request, res: Response) => {
  try {
    const service = await createServiceDB(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Service creation failed", error });
  }
};


export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await updateServiceDB(+req.params.id, req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Service update failed", error });
  }
};


export const deleteService = async (req: Request, res: Response) => {
  try {
    await deleteServiceDB(+req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Service deletion failed", error });
  }
};


export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const services = await getAllServicesDB();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Fetching services failed", error });
  }
};
