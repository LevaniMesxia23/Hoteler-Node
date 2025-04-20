import { Router } from "express";
import {
  createService,
  updateService,
  deleteService,
  getAllServices,
} from "./ServiceController";

const router = Router();


router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);


router.get("/", getAllServices);

export default router;
