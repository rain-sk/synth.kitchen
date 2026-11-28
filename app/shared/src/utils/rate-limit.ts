export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfter: number };

export type RateLimiter = {
  check: (key: string) => RateLimitResult;
  sweep: () => void;
};

export const createRateLimiter = ({
  windowMs,
  maxPerWindow,
  now = () => Date.now(),
}: {
  windowMs: number;
  maxPerWindow: number;
  now?: () => number;
}): RateLimiter => {
  const buckets = new Map<string, { count: number; resetAt: number }>();

  const sweep = () => {
    const nowValue = now();
    for (const [key, entry] of buckets) {
      if (entry.resetAt <= nowValue) {
        buckets.delete(key);
      }
    }
  };

  return {
    check: (key: string) => {
      const nowValue = now();
      if (Math.random() < 0.02) {
        sweep();
      }

      const entry = buckets.get(key);
      if (!entry || entry.resetAt <= nowValue) {
        buckets.set(key, { count: 1, resetAt: nowValue + windowMs });
        return { allowed: true };
      }

      entry.count += 1;
      if (entry.count > maxPerWindow) {
        const retryAfter = Math.ceil((entry.resetAt - nowValue) / 1000);
        return { allowed: false, retryAfter };
      }
      return { allowed: true };
    },
    sweep,
  };
};
