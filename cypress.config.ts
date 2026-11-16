import { defineConfig } from "cypress";

// Override for machines where 8080 is taken (e.g. a lingering autossh forward:
// a foreign server answering 200 on 8080 makes every spec fail confusingly).
const baseUrl = process.env.CYPRESS_BASE_URL ?? "http://localhost:8080";

export default defineConfig({
  e2e: {
    baseUrl,
    env: {
      // the api listens on its own port in dev; nginx proxies /api in prod
      API_URL: process.env.CYPRESS_API_URL ?? "http://localhost:3000",
    },
    setupNodeEvents(_, __) {},
    video: true,
    screenshotOnRunFailure: false,
    watchForFileChanges: true,
  },
});
