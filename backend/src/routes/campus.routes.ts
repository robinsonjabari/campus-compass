import { Router } from "express";
import { getCampuses } from "../controllers/campus.controller.js";

const router = Router();

router.get("/", getCampuses);

export default router;