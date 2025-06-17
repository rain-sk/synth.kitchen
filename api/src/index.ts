import { server } from "./server";
import { AppDataSource } from "./data-source";
import { apiHost, port } from "./env";

server.listen(port, async (e) => {
  if (e) {
    console.error("app.listen() failed", e);
    process.exit(1);
  }
  try {
    console.log("Initializing database connection...");
    await AppDataSource.initialize();
    console.log("Done.");
  } catch (e) {
    console.error("AppDataSource.initialize() failed", e);
    process.exit(1);
  }
  console.log(`Server is online: ${apiHost}`);
});
