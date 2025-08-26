import express from "express";
import cors from "cors";

import { AuthRouter } from "./routes/auth";
import { HealthCheckRouter } from "./routes/health";
import { PatchRouter } from "./routes/patch";
import { TokenRouter } from "./routes/token";

import { apiBase, appOrigin, healthRoute } from "./env";

const ServerRouter = express.Router();
ServerRouter.use(`/${healthRoute}`, HealthCheckRouter);
ServerRouter.use("/auth", AuthRouter);
ServerRouter.use("/patch", PatchRouter);
ServerRouter.use("/token", TokenRouter);
ServerRouter.get("/", (_, res) => {
  res.status(400).send("400: Invalid request.");
});

export const server = express();
server.use(cors({ origin: appOrigin }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(apiBase, ServerRouter);
