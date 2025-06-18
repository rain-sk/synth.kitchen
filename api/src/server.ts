import express from "express";
import cors from "cors";
import UserRouter from "./routes/user";
import HealthCheckRouter from "./routes/health";
import { appOrigin, jwtSecret } from "./env";
import { expressjwt } from "express-jwt";

// import { auth } from "./middleware/auth";

export const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: appOrigin,
  })
);
server.use(
  expressjwt({
    secret: jwtSecret,
    algorithms: ["HS256"],
  }).unless({ path: ["/user/login"] })
);
// server.use(auth);

server.use(HealthCheckRouter);
server.use(UserRouter);

server.get("/", (req, res) => {
  res.status(400).send("400: Invalid request.");
});
