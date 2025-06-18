import { server } from "./server";
import { AppDataSource } from "./data-source";

const port = parseInt(process.env.PORT || "") || 3000;

server.listen(port, async (e) => {
  if (e) {
    console.error("app.listen() failed", e);
    process.exit(1);
  }
  try {
    await AppDataSource.initialize();
  } catch (e) {
    console.error("AppDataSource.initialize() failed", e);
    process.exit(1);
  }
  console.log(
    "Server is successfully running, and is listening on the assigned port."
  );
});
