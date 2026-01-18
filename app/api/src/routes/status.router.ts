import express from "express";
import { patchStateNeedsUpgrade } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { SavedPatchState } from "../entity/SavedPatchState";

async function pendingStateUpgrades() {
  return (await AppDataSource.getRepository(SavedPatchState).find()).filter(
    (entry) => patchStateNeedsUpgrade(entry.state),
  ).length;
}

export const ServerStatusRouter = express.Router();

ServerStatusRouter.get("/health", async (req, res) => {
  if (!AppDataSource.isInitialized) {
    res.status(500).send("unhealthy");
    setTimeout(() => {
      process.exit(1);
    }, 20);
  } else {
    res.status(200).send("OK");
  }
});

ServerStatusRouter.get("/status", async (req, res) => {
  res.status(200).json({
    pendingStateUpgrades: await pendingStateUpgrades(),
  });
});
