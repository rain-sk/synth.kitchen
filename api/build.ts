import esbuild from "esbuild";
import {
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
} from "./src/env";

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outdir: "./build",
    external: [
      "bcrypt",
      "express",
      "typeorm",
      "nodemailer",
      "jsonwebtoken",
      "express-jwt",
    ],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: false,
    platform: "node",
    target: "esnext",
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
      "process.env.POSTGRES_DB_NAME": `"${pgDbName}"`,
      "process.env.POSTGRES_HOST": `"${pgHost}"`,
      "process.env.POSTGRES_USERNAME": `"${pgUser}"`,
      "process.env.POSTGRES_PASSWORD": `"${pgPassword}"`,
      "process.env.POSTGRES_PORT": `"${pgPort}"`,
      "process.env.HEALTH_ROUTE": `"${healthRoute}"`,
    },
  })
  .then(() => console.log("⚡ Bundle build complete ⚡"))
  .catch(() => {
    process.exit(1);
  });
