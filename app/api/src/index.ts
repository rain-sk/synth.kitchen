import { server } from "./server";
import { AppDataSource } from "./data-source";
import { apiBase, apiHost, apiPort } from "./env";
import { Patch } from "./entity/Patch";
import {
  PatchState,
  patchStateNeedsUpgrade,
  upgradePatchState,
} from "synth.kitchen-shared";
import { SavedPatchState } from "./entity/SavedPatchState";

const initDatabaseConnection = async () => {
  return new Promise(async (resolve) => {
    let tries = 0;
    const tryInit = async () => {
      try {
        await AppDataSource.initialize();
        console.log("Connected to database");
        resolve(undefined);
      } catch (e) {
        tries += 1;
        if (tries === 100) {
          console.error("AppDataSource.initialize() failed", e);
          process.exit(1);
        } else {
          setTimeout(tryInit, 1000);
        }
      }
    };
    tryInit();
  });
};

const executePendingUpgrades = async () => {
  const stateRepository = AppDataSource.getRepository(SavedPatchState);

  const statesToUpgrade = await stateRepository.find({
    where: { needsUpgrade: true },
  });

  const repo = AppDataSource.getRepository(SavedPatchState);
  for (const state of statesToUpgrade) {
    if (await patchStateNeedsUpgrade(state.state as any as PatchState)) {
      state.state = upgradePatchState(state.state as any as PatchState) as any;
      await repo.save(state);
    }
  }

  if (statesToUpgrade.length > 0) {
    console.log("Executed pending database upgrades");
  }
};

server.listen(apiPort, async (e) => {
  if (e) {
    console.error("app.listen() failed", e);
    process.exit(1);
  }

  await initDatabaseConnection();
  await executePendingUpgrades();

  console.log(`API server is online: ${apiHost}`);
});
