import { Router } from "express";
import {
  getBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding,
} from "../controllers/building.controller.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getBuildings);

router.post(
  "/",
  authenticateToken,
  requireAdmin,
  createBuilding
);

router.patch(
  "/:id",
  authenticateToken,
  requireAdmin,
  updateBuilding
);

router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteBuilding
);

router.get("/:id", getBuildingById);

export default router;