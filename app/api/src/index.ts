import {
  APP_STATE_VERSION,
  patchStateNeedsUpgrade,
  upgradePatchState,
} from "synth.kitchen-shared";

import { apiHost, apiPort } from "./env";
import { AppDataSource } from "./data-source";
import { SavedPatchState } from "./entity/SavedPatchState";
import { server } from "./server";
import { AppInfo } from "./entity/AppInfo";

const initDatabaseConnection = async () => {
  console.log("Initiating database connection:");
  return new Promise(async (resolve) => {
    let tries = 0;
    const tryInit = async () => {
      try {
        await AppDataSource.initialize();
        console.log("Connected to database");
        resolve(undefined);
      } catch (e) {
        tries += 1;
        if (tries >= 30) {
          console.error("AppDataSource.initialize() failed", e);
          process.exit(1);
        } else {
          setTimeout(tryInit, 50);
        }
      }
    };
    tryInit();
  });
};

const verifyAppStateVersion = async () => {
  try {
    const appInfoRepo = AppDataSource.getRepository(AppInfo);
    const version = await appInfoRepo.findOneOrFail({
      where: { key: "version" },
    });
    if (version.data === APP_STATE_VERSION) {
      return;
    } else {
      console.error(
        `Current app state version (${APP_STATE_VERSION}) does not match the database version (${version.data}).`
      );
    }
  } catch (e) {
    console.error("Unable to confirm app state version.", e);
  }
  process.exit(1);
};

const cleanupStaleData = async () => {
  const stateRepository = AppDataSource.getRepository(SavedPatchState);
  const res = await stateRepository.delete({ patch: null });
  return res;
};

const upgradePatchStates = async () => {
  const stateRepository = AppDataSource.getRepository(SavedPatchState);

  const statesToUpgrade = (await stateRepository.find()).filter((entry) =>
    patchStateNeedsUpgrade(entry.state)
  );

  const numberOfStatesToUpgrade = statesToUpgrade.length;
  if (numberOfStatesToUpgrade > 0) {
    console.log(`Upgrading ${numberOfStatesToUpgrade} saved patch states`);
    const repo = AppDataSource.getRepository(SavedPatchState);
    let remainingUpgrades = 0;
    for (const entry of statesToUpgrade) {
      entry.state = upgradePatchState(entry.state);
      await repo.save(entry);
      if (patchStateNeedsUpgrade(entry.state)) {
        remainingUpgrades++;
      }
    }

    console.log(
      `Upgraded ${numberOfStatesToUpgrade - remainingUpgrades} patch states`
    );
    if (remainingUpgrades > 0) {
      console.log(`${remainingUpgrades} upgrades pending.`);
    }
  }
};

const executePendingUpgrades = async () => {
  await upgradePatchStates();
};

initDatabaseConnection()
  .then(verifyAppStateVersion)
  .then(cleanupStaleData)
  .then(executePendingUpgrades)
  .then(() => {
    server.listen(apiPort, async (e) => {
      if (e) {
        console.error("app.listen() failed", e);
        process.exit(1);
      }

      console.log(`API server is online: ${apiHost}`);
    });
  });
