import express from "express";
import cors from "cors";

import { AuthRouter } from "./routes/auth.router";
import { PatchRouter } from "./routes/patch.router";
import { ServerStatusRouter } from "./routes/status.router";
import { TokenRouter } from "./routes/token.router";

import { apiBase, appOrigin, healthRoute } from "./env";

const ServerRouter = express.Router();
ServerRouter.use(`/${healthRoute}`, ServerStatusRouter);
ServerRouter.use("/auth", AuthRouter);
ServerRouter.use("/patch", PatchRouter);
ServerRouter.use("/token", TokenRouter);
ServerRouter.get("/", (_, res) => {
  res.status(400).json({ error: "Invalid request." });
});
ServerRouter.use((_, res) => {
  res.status(404).json({ error: "Not found." });
});

export const server = express();
server.use(cors({ origin: appOrigin }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(apiBase, ServerRouter);
server.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});
