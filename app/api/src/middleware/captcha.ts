import { Request, Response, NextFunction } from "express";

import { CaptchaService } from "../services/captcha.service";

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
