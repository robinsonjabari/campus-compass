import { Router } from "express";
import {
  getBuildings,
  getBuildingById,
} from "../controllers/building.controller.js";

const router = Router();

router.get("/", getBuildings);
router.get("/:id", getBuildingById);

export default router;