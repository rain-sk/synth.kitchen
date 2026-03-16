import express from "express";

import { jwt } from "../middleware/jwt";
import { CustomModuleController } from "../controllers/custom-module.controller";

export const CustomModuleRouter = express.Router();

CustomModuleRouter.get("/", CustomModuleController.getCustomModule);
CustomModuleRouter.get("/info/", CustomModuleController.getCustomModuleInfo);
CustomModuleRouter.get("/id", CustomModuleController.getUniqueCustomModuleId);
CustomModuleRouter.get("/fork/:id", jwt, CustomModuleController.forkCustomModule);
CustomModuleRouter.post("/", jwt, CustomModuleController.createCustomModule);
CustomModuleRouter.put("/:id", jwt, CustomModuleController.updateCustomModule);
CustomModuleRouter.delete("/:id", jwt, CustomModuleController.deleteCustomModule);
