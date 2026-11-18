import { Request, Response, NextFunction } from "express";

import { CaptchaService } from "../services/captcha.service";

// sits in front of the bot-magnets: registration and password-reset requests.
// the solved token rides as capToken; every rejection path is a 400, never a pass-through
export const captchaRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (await CaptchaService.verify(req.body?.captchaToken)) {
    next();
    return;
  }
  res.status(400).json({
    errors: {
      email: [],
      username: [],
      password: [],
      confirmPassword: [],
      form: ["Please complete the captcha."],
    },
  });
};
