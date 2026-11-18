import { captchaEnabled, captchaEndpoint, captchaSecret } from "../env";

// token verification against the self-hosted cap instance, reCAPTCHA-shaped: { success }
const verificationTimeout = 8000;

export class CaptchaService {
  // fail-closed: a missing endpoint, secret, or token refuses the request; only an
  // explicit success:true accepts it
  static verify = async (token: unknown): Promise<boolean> => {
    if (!captchaEnabled) {
      return true;
    }

    if (
      !captchaEndpoint ||
      !captchaSecret ||
      typeof token !== "string" ||
      token.length === 0
    ) {
      return false;
    }

    try {
      const response = await Promise.race([
        fetch(captchaEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret: captchaSecret, response: token }),
        }),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("captcha verification timed out")),
            verificationTimeout
          )
        ),
      ]);
      const result = (await response.json()) as { success?: boolean };
      return result.success === true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
}
