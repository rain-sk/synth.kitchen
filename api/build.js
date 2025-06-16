const esbuild = require("esbuild");
const {
  port,
  adminEmail,
  appOrigin,
  transactionalEmail,
  smtpHost,
  smtpPassword,
  smtpPort,
  smtpUsername,
  pgDbName,
  pgHost,
  pgUser,
  pgPassword,
  pgPort,
  healthRoute,
} = require("./src/env");

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outdir: "./build",
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: "node",
    target: "node20",
    format: "esm",
    color: true,
    tsconfig: "./tsconfig.json",
    define: {
      "process.env.PORT": `"${port}"`,
      "process.env.ADMIN_EMAIL": `"${adminEmail}"`,
      "process.env.APP_ORIGIN": `"${appOrigin}"`,
      "process.env.TRANSACTIONAL_EMAIL": `"${transactionalEmail}"`,
      "process.env.SMTP_HOST": `"${smtpHost}"`,
      "process.env.SMTP_PASSWORD": `"${smtpPassword}"`,
      "process.env.SMTP_PORT": `"${smtpPort}"`,
      "process.env.SMTP_USERNAME": `"${smtpUsername}"`,
      "process.env.PG_DB_NAME": `"${pgDbName}"`,
      "process.env.PG_HOST": `"${pgHost}"`,
      "process.env.PG_USER": `"${pgUser}"`,
      "process.env.PG_PASSWORD": `"${pgPassword}"`,
      "process.env.PG_PORT": `"${pgPort}"`,
      "process.env.HEALTH_ROUTE": `"${healthRoute}"`,
    },
  })
  .then(() => console.log("⚡ Bundle build complete ⚡"))
  .catch(() => {
    process.exit(1);
  });
