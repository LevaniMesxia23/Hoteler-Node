import { Router } from "express";

import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";
import { createStaff, deleteStaff, getallStaff, updateStaff } from "../controllers/staff";



const router = Router();

router.get("/",getallStaff);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createStaff);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]),updateStaff);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]),deleteStaff);

export default router;