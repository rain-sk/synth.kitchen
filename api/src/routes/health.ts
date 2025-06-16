import express from "express";
import { AppDataSource } from "../data-source";

export const HealthCheckRouter = express.Router();

HealthCheckRouter.get("/", async (req, res) => {
  if (AppDataSource.isInitialized) {
    res.status(200).send("OK");
  } else {
    res.status(500).send("unhealthy");
  }
});
