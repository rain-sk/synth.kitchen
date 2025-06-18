export const adminEmail = process.env.ADMIN_EMAIL || "admin@synth.kitchen";
export const appOrigin = process.env.APP_ORIGIN || "http://localhost:8080";
export const healthRoute = process.env.HEALTH_ROUTE || "health";
export const pgDbName = process.env.PG_DB_NAME || "";
export const pgHost = process.env.PG_HOST || "";
export const pgPassword = process.env.PG_PASSWORD || "";
export const pgPort = process.env.PG_PORT || "5432";
export const pgUser = process.env.PG_USER || "";
export const port = process.env.PORT || "3000";
export const smtpHost = process.env.SMTP_HOST || "";
export const smtpPassword = process.env.SMTP_PASSWORD || "";
export const smtpPort = process.env.SMTP_PORT || "587";
export const smtpUsername = process.env.SMTP_USERNAME || "";
export const transactionalEmail =
  process.env.TRANSACTIONAL_EMAIL || "api@synth.kitchen";
export const bcryptCost = parseInt(process.env.BCRYPT_COST || "") || 12;
export const jwtSecret = process.env.JWT_SECRET || "Hello World!";
