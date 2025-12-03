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
// import { User } from "./entity/User";
// import { VerificationService } from "./services/verification.service";

const NUM_RETRIES = 100;

const initDatabaseConnection = async () =>
  new Promise(async (resolve) => {
    console.log("Initiating database connection:");
    let tries = 0;
    const tryInit = async () => {
      try {
        await AppDataSource.initialize();
        console.log("Connected to database");
        resolve(undefined);
      } catch (e) {
        tries += 1;
        if (tries < NUM_RETRIES) {
          setTimeout(tryInit, 100);
        } else {
          console.error(
            `AppDataSource.initialize() failed after ${NUM_RETRIES} attempts.`
          );
          throw e;
        }
      }
    };
    tryInit();
  });

const verifyAppStateVersion = async () => {
  console.log(`App version: ${APP_STATE_VERSION}`);

  const version = await AppDataSource.getRepository(AppInfo).findOneOrFail({
    where: { key: "version" },
  });

  if (version.data !== APP_STATE_VERSION) {
    throw new Error(
      `App version (${APP_STATE_VERSION}) does not match database (${version.data}).`
    );
  }
};

const cleanupStaleData = async () =>
  await AppDataSource.getRepository(SavedPatchState).delete({ patch: null });

const upgradePatchStates = async () =>
  await AppDataSource.transaction(async (manager) => {
    const stateRepository = manager.getRepository(SavedPatchState);

    const statesToUpgrade = (await stateRepository.find()).filter((entry) =>
      patchStateNeedsUpgrade(entry.state)
    );

    const numberOfStatesToUpgrade = statesToUpgrade.length;
    if (numberOfStatesToUpgrade === 0) {
      return;
    }

    console.log(`Upgrading ${numberOfStatesToUpgrade} saved patch states`);

    const repo = AppDataSource.getRepository(SavedPatchState);
    for (const entry of statesToUpgrade) {
      entry.state = upgradePatchState(entry.state);
    }

    const remainingUpgrades = statesToUpgrade.filter((entry) =>
      patchStateNeedsUpgrade(entry.state)
    );
    if (remainingUpgrades.length > 0) {
      throw new Error(
        `Failed to upgrade all patch states: ${remainingUpgrades.length} upgrades failed`,
        {
          cause: { remainingUpgrades },
        }
      );
    }

    for (const entry of statesToUpgrade) {
      await repo.save(entry);
    }

    console.log(`Upgraded ${numberOfStatesToUpgrade} patch states`);
  });

// const sendPendingVerificationEmails = async () => {
//   const users = AppDataSource.getRepository(User);
//   for (const user of await users.find({ where: { verified: false } })) {
//     VerificationService.initiateVerification(user);
//   }
// };

const initServer = () => {
  server.listen(apiPort, (e) => {
    if (e) {
      throw e;
    }
    console.log(`API server is online: ${apiHost}`);
  });
};

initDatabaseConnection()
  .then(verifyAppStateVersion)
  .then(cleanupStaleData)
  .then(upgradePatchStates)
  // .then(sendPendingVerificationEmails)
  .then(initServer)
  .catch((e) => {
    console.error(e);
    if (e.cause) {
      console.error(JSON.stringify(e.cause));
    }
    process.exit(1);
  });
