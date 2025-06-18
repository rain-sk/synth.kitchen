import express from "express";

export const HealthCheckRouter = express.Router();

HealthCheckRouter.get("/", (req, res) => {
  res.status(200).send("OK");
});
