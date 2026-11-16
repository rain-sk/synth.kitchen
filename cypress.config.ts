import { defineConfig } from "cypress";

const baseUrl = process.env.CYPRESS_BASE_URL ?? "http://localhost:8080";

export default defineConfig({
  e2e: {
    baseUrl,
    env: {
      API_URL: process.env.CYPRESS_API_URL ?? `${baseUrl}/api`,
    },
    setupNodeEvents(_, __) {},
    video: true,
    screenshotOnRunFailure: false,
    watchForFileChanges: true,
  },
});
