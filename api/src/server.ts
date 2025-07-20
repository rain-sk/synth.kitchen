import express from "express";
import cors from "cors";

import { jwt } from "./middleware/jwt";

import { AuthRouter } from "./routes/auth";
import { HealthCheckRouter } from "./routes/health";
import { TokenRouter } from "./routes/token";

import { appOrigin, healthRoute } from "./env";

export const server = express();
server.use(cors({ origin: appOrigin }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Template: custom hooks
// server.use((req, res, next) => {
//   console.log(req.path);
//   req.auth = xyz(req.headers.authorization);
//   if (valid_request) {
//     next();
//   }
// });

server.use(`/${healthRoute}`, HealthCheckRouter);
server.use("/auth", AuthRouter);
server.use("/token", jwt, TokenRouter);

server.get("/", (req, res) => {
  res.status(400).send("400: Invalid request.");
});
