import { server } from "./server";
import { AppDataSource } from "./data-source";
import { apiHost, apiPort } from "./env";

server.listen(apiPort, async (e) => {
  if (e) {
    console.error("app.listen() failed", e);
    process.exit(1);
  }

  await new Promise(async (resolve) => {
    let tries = 0;
    const tryInit = async () => {
      try {
        console.log("Initializing database connection...");
        await AppDataSource.initialize();
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

  console.log(`API server is online: ${apiHost}`);
});
