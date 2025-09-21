import express from "express";

import { jwt } from "../middleware/jwt";
import { PatchController } from "../controllers/patch.controller";

export const PatchRouter = express.Router();

PatchRouter.get("/", PatchController.getPatch);
PatchRouter.get("/info/", PatchController.getPatchInfo);
PatchRouter.get("/id", PatchController.getUniquePatchId);
PatchRouter.get("/fork/:id", jwt, PatchController.forkPatch);
PatchRouter.post("/", jwt, PatchController.createPatch);
PatchRouter.patch("/:id", jwt, PatchController.updatePatch);
