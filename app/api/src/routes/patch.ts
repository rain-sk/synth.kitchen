import express from "express";
import { PatchController } from "../controllers/patch";

export const PatchRouter = express.Router();

PatchRouter.get("/", PatchController.getPatch);
PatchRouter.get("/id", PatchController.getUniquePatchId);
