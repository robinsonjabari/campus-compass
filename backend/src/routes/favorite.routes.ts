import { Router } from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favorite.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getFavorites);
router.post("/", authenticateToken, addFavorite);
router.delete("/:buildingId", authenticateToken, removeFavorite);

export default router;