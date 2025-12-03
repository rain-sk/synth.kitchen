import express from "express";

import { jwt } from "../middleware/jwt";

import { AuthController } from "../controllers/auth.controller";

export const AuthRouter = express.Router();

AuthRouter.get("/user", jwt, AuthController.getUser);
AuthRouter.delete("/user", jwt, AuthController.deleteUser);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/reset-password", AuthController.resetPassword);
AuthRouter.post("/reset-password-request", AuthController.requestResetPassword);
AuthRouter.get("/verify/:key", AuthController.verify);
