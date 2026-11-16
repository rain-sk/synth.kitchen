import express from "express";
import { patchStateNeedsUpgrade } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { SavedPatchState } from "../entity/SavedPatchState";

async function pendingStateUpgrades() {
  return (await AppDataSource.getRepository(SavedPatchState).find()).filter(
    (entry) => patchStateNeedsUpgrade(entry.state),
  ).length;
}

const health = async (req: express.Request, res: express.Response) => {
  if (!AppDataSource.isInitialized) {
    res.status(500).send("unhealthy");
  } else {
    res.status(200).send("OK");
  }
};

export const ServerStatusRouter = express.Router();

ServerStatusRouter.get("/", health);
ServerStatusRouter.get("/health", health);

ServerStatusRouter.get("/status", async (req, res) => {
  res.status(200).json({
    pendingStateUpgrades: await pendingStateUpgrades(),
  });
});
