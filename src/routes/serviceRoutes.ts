import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from "../controllers/ServiceController";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";

const router = Router();

router.get("/", getAllServices);

router.post("/", authMiddleware, roleMiddleware(["admin"]), createService);

router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateService);

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteService);

export default router;
