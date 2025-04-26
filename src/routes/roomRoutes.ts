import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from "../controllers/room";
const router = Router();

router.get("/",getAllRooms);
router.get("/:id",getRoomById);
router.post("/",authMiddleware,roleMiddleware(["admin"]),createRoom);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateRoom);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"],),deleteRoom);

export default router;