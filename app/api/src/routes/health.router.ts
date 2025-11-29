import express from "express";
import { patchStateNeedsUpgrade } from "synth.kitchen-shared";

import { AppDataSource } from "../data-source";
import { SavedPatchState } from "../entity/SavedPatchState";

async function pendingStateUpgrades() {
  return (await AppDataSource.getRepository(SavedPatchState).find()).some(
    (entry) => patchStateNeedsUpgrade(entry.state)
  );
}

export const HealthCheckRouter = express.Router();

HealthCheckRouter.get("/", async (req, res) => {
  if (!AppDataSource.isInitialized || (await pendingStateUpgrades())) {
    res.status(500).send("unhealthy");
  } else {
    res.status(200).send("OK");
  }
});
