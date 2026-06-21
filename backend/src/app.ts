import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/health", healthRoutes);

export default app;