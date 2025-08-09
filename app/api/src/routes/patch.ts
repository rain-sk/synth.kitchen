import express from "express";
import { PatchController } from "../controllers/patch";

export const PatchRouter = express.Router();

PatchRouter.get("/id", PatchController.getNewPatchId);
PatchRouter.get("/:idOrSlug", PatchController.getPatch);
