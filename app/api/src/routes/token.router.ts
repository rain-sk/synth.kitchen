import express from "express";

import { TokenController } from "../controllers/token.controller";
import { jwt } from "../middleware/jwt";

export const TokenRouter = express.Router();

TokenRouter.get(`/`, jwt, TokenController.checkToken);
TokenRouter.get(`/refresh`, TokenController.refreshToken);
