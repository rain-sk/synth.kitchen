import { server } from "./server";
import { AppDataSource } from "./data-source";
import { apiHost, apiPort } from "./env";
import { Patch } from "./entity/Patch";
import { upgradePatch } from "synth.kitchen-shared";

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
  const patchQueryBuilder = AppDataSource.manager.createQueryBuilder(
    Patch,
    "patch"
  );

  const patchesToUpgrade = await patchQueryBuilder
    .where("patch.needsUpgrade = :needsUpgrade", { needsUpgrade: true })
    .select(["patch.id", "patch.name", "patch.slug", "patch.state"])
    .getMany();

  await Promise.all(
    patchesToUpgrade.map(async (patch) => {
      const upgradedPatch = upgradePatch(patch);

      return await AppDataSource.manager
        .getRepository(Patch)
        .save({ ...upgradedPatch, needsUpgrade: false });
    })
  );

  if (patchesToUpgrade.length > 0) {
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
