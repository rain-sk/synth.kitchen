export default ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-mailersend",
      providerOptions: {
        apiKey: env("MAILERSEND_API_KEY"),
      },
      settings: {
        defaultFrom: "rain@synth.kitchen",
        defaultReplyTo: "contact@synth.kitchen",
      },
    },
  },
});
