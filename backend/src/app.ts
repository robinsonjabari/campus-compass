import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import campusRoutes from "./routes/campus.routes.js";
import buildingRoutes from "./routes/building.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/campuses", campusRoutes);
app.use("/api/v1/buildings", buildingRoutes);
app.use("/api/v1/auth", authRoutes);
export default app;