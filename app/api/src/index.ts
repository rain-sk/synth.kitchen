import {
  patchStateNeedsUpgrade,
  upgradePatchState,
} from "synth.kitchen-shared";

import { apiHost, apiPort } from "./env";
import { AppDataSource } from "./data-source";
import { SavedPatchState } from "./entity/SavedPatchState";
import { server } from "./server";

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

const upgradePatchStates = async () => {
  const stateRepository = AppDataSource.getRepository(SavedPatchState);

  const statesToUpgrade = (await stateRepository.find()).filter(
    async (entry) => await patchStateNeedsUpgrade(entry.state)
  );

  const numberOfStatesToUpgrade = statesToUpgrade.length;
  if (numberOfStatesToUpgrade > 0) {
    console.log(`Upgrading ${numberOfStatesToUpgrade} saved patch states`);
    const repo = AppDataSource.getRepository(SavedPatchState);
    let remainingUpgrades = 0;
    for (const entry of statesToUpgrade) {
      entry.state = upgradePatchState(entry.state) as any;
      await repo.save(entry);
      if (await patchStateNeedsUpgrade(entry.state)) {
        remainingUpgrades++;
      }
    }

    console.log(
      `Executed ${
        numberOfStatesToUpgrade - remainingUpgrades
      } patch state upgrades`
    );
    if (remainingUpgrades > 0) {
      console.log(`${remainingUpgrades} upgrades pending.`);
    }
  }
};

const executePendingUpgrades = async () => {
  await upgradePatchStates();
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
