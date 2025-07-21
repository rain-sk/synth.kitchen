import express from "express";

import { TokenController } from "../controllers/token";

export const TokenRouter = express.Router();

TokenRouter.get(`/`, TokenController.checkToken);
TokenRouter.get(`/refresh`, TokenController.refreshToken);
