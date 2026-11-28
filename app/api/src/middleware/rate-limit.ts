import type { Request, Response, NextFunction } from "express";

import { createRateLimiter } from "synth.kitchen-shared";

const limiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  maxPerWindow: parseInt(process.env.RATE_LIMIT_MAX ?? "3", 10),
});

export function codeRateLimit(req: Request, res: Response, next: NextFunction) {
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";

  const result = limiter.check(email || "unknown");
  if (result.allowed === false) {
    res.set("Retry-After", String(result.retryAfter));
    res.status(429).json({ error: "Too many requests.", retryAfter: result.retryAfter });
    return;
  }
  next();
}
