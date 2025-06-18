import express from "express";
import cors from "cors";

import { AuthRouter } from "./routes/auth";
import { HealthCheckRouter } from "./routes/health";

import { appOrigin, healthRoute } from "./env";
import { TokenRouter } from "./routes/token";

export const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: appOrigin,
  })
);

server.use(`/${healthRoute}`, HealthCheckRouter);
server.use("/auth", AuthRouter);
server.use("/token", TokenRouter);

server.get("/", (req, res) => {
  res.status(400).send("400: Invalid request.");
});
