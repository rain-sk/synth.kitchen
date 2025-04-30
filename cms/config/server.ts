export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: `http://${(env("HOST"), "localhost")}`,
  app: {
    keys: env.array("APP_KEYS"),
  },
});
