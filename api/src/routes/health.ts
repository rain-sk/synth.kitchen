import express from "express";

const HealthCheckRouter = express.Router();

const healthRoute = process.env.HEALTH_ROUTE || "health";
HealthCheckRouter.get(`/${healthRoute}`, (req, res) => {
  res.status(200).send("OK");
});

export default HealthCheckRouter;
