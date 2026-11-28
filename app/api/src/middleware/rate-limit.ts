import type { Request, Response, NextFunction } from "express";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

const sweep = () => {
  const now = Date.now();
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  }
};

export function codeRateLimit(req: Request, res: Response, next: NextFunction) {
  const email =
    typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const key = email || "unknown";
  const now = Date.now();

  if (Math.random() < 0.02) {
    sweep();
  }

  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    res.status(429).json({ error: "Too many requests.", retryAfter });
    return;
  }
  return next();
}
