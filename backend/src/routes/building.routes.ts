import { Router } from "express";
import {
  getBuildings,
  getBuildingById,
} from "../controllers/building.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getBuildings);

router.get("/:id", getBuildingById);

export default router;