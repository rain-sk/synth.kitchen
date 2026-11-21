import { defineConfig } from "cypress";
import fs from "node:fs";

const baseUrl = process.env.CYPRESS_BASE_URL ?? "http://localhost:8080";

export default defineConfig({
  e2e: {
    baseUrl,
    env: {
      API_URL: process.env.CYPRESS_API_URL ?? `${baseUrl}/api`,
    },
    setupNodeEvents(on, _config) {
      on("after:spec", (spec, results) => {
        if (results?.video && results.stats?.failures === 0) {
          fs.rmSync(results.video, { force: true });
        }
      });
    },
    video: true,
    screenshotOnRunFailure: false,
    watchForFileChanges: true,
  },
});
