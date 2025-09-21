import express from "express";
import { PatchController } from "../controllers/patch.controller";

export const PatchRouter = express.Router();

PatchRouter.get("/", PatchController.getPatch);
PatchRouter.get("/id", PatchController.getUniquePatchId);
PatchRouter.get("/random", PatchController.getRandomPatch);
PatchRouter.post("/", PatchController.createPatch);
PatchRouter.patch("/:id", PatchController.updatePatch);
