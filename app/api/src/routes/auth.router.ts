import express from "express";

import { jwt } from "../middleware/jwt";
import { captchaRequired } from "../middleware/captcha";
import { loginRateLimit } from "../middleware/rate-limit";

import { AuthController } from "../controllers/auth.controller";

export const AuthRouter = express.Router();

AuthRouter.get("/user", jwt, AuthController.getUser);
AuthRouter.delete("/user", jwt, AuthController.deleteUser);
AuthRouter.post("/login", loginRateLimit, AuthController.login);
AuthRouter.post("/register", captchaRequired, AuthController.register);
AuthRouter.post("/reset-password", AuthController.resetPassword);
AuthRouter.post(
  "/reset-password-request",
  captchaRequired,
  AuthController.requestResetPassword
);
AuthRouter.get("/verify/:key", AuthController.verify);
