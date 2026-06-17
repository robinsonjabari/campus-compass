import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Campus Compass API is running",
  });
});

export default app;