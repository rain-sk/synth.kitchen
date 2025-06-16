import express from "express";
import cors from "cors";
import UserRouter from "./routes/user";
import HealthCheckRouter from "./routes/health";
import { appOrigin } from "./env";

// import { auth } from "./middleware/auth";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: appOrigin,
  })
);
// app.use(auth);

app.use(HealthCheckRouter);
app.use(UserRouter);

app.get("/", (req, res) => {
  res.status(400).send("400: Invalid request.");
});
