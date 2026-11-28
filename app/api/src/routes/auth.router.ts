import express from "express";

import { jwt } from "../middleware/jwt";
import { captchaRequired } from "../middleware/captcha";
import { codeRateLimit } from "../middleware/rate-limit";

import { AuthController } from "../controllers/auth.controller";

export const AuthRouter = express.Router();

AuthRouter.get("/user", jwt, AuthController.getUser);
AuthRouter.delete("/user", jwt, AuthController.deleteUser);
AuthRouter.post("/request-code", captchaRequired, codeRateLimit, AuthController.requestCode);
AuthRouter.post("/verify-code", AuthController.verifyCode);
