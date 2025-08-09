export const adminEmail = process.env.ADMIN_EMAIL || "admin@synth.kitchen";
export const apiHost = process.env.API_HOST || "synth.kitchen";
export const apiBase = process.env.API_BASE || "";
export const appOrigin = process.env.APP_ORIGIN || "https://synth.kitchen";
export const healthRoute = process.env.HEALTH_ROUTE || "health";
export const dbLogging = process.env.DB_LOGGING === "1" || false;
export const pgDbName = process.env.POSTGRES_DB_NAME || "";
export const pgHost = process.env.POSTGRES_HOST || "";
export const pgPassword = process.env.POSTGRES_PASSWORD || "";
export const pgPort = parseInt(process.env.POSTGRES_PORT || "5432");
export const pgUser = process.env.POSTGRES_USERNAME || "";
export const apiPort = parseInt(process.env.API_PORT || "3000");
export const smtpHost = process.env.SMTP_HOST || "";
export const smtpPassword = process.env.SMTP_PASSWORD || "";
export const smtpPort = parseInt(process.env.SMTP_PORT || "587");
export const smtpUsername = process.env.SMTP_USERNAME || "";
export const transactionalEmail =
  process.env.TRANSACTIONAL_EMAIL || "api@synth.kitchen";
export const bcryptCost = parseInt(process.env.BCRYPT_COST || "12");
export const jwtSecret = process.env.JWT_SECRET || "Hello World!";

const errors: string[] = [];
if (!pgHost) {
  errors.push("Missing parameter: POSTGRES_HOST");
}
if (!pgDbName) {
  errors.push("Missing parameter: POSTGRES_DB_NAME");
}
if (!pgUser) {
  errors.push("Missing parameter: POSTGRES_USERNAME");
}
if (!pgPassword) {
  errors.push("Missing parameter: POSTGRES_PASSWORD");
}
if (!smtpHost) {
  errors.push("Missing parameter: SMTP_HOST");
}
if (!smtpUsername) {
  errors.push("Missing parameter: SMTP_USERNAME");
}
if (!smtpPassword) {
  errors.push("Missing parameter: SMTP_PASSWORD");
}
if (errors.length > 0) {
  process.exitCode = 1;

  const errorMessage =
    `ERROR: Unable to initialize ${apiHost}.\n` + errors.join("\n");
  console.error(errorMessage);
  throw new Error(errorMessage);
}
