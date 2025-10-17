import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    setupNodeEvents(_, __) {},
    video: false,
    screenshotOnRunFailure: false,
  },
});
