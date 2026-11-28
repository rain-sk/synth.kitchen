import { describe, expect, it, vi } from "vitest";

import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
	it("allows up to the cap within a window", () => {
		const limiter = createRateLimiter({ windowMs: 60_000, maxPerWindow: 3 });

		expect(limiter.check("a@synth.kitchen").allowed).toBe(true);
		expect(limiter.check("a@synth.kitchen").allowed).toBe(true);
		expect(limiter.check("a@synth.kitchen").allowed).toBe(true);

		const fourth = limiter.check("a@synth.kitchen");
		expect(fourth.allowed).toBe(false);
		if (!fourth.allowed) {
			expect(fourth.retryAfter).toBeGreaterThan(0);
			expect(fourth.retryAfter).toBeLessThanOrEqual(60);
		}
	});

	it("tracks keys independently", () => {
		const limiter = createRateLimiter({ windowMs: 60_000, maxPerWindow: 1 });

		expect(limiter.check("a@synth.kitchen").allowed).toBe(true);
		expect(limiter.check("b@synth.kitchen").allowed).toBe(true);
		expect(limiter.check("a@synth.kitchen").allowed).toBe(false);
	});

	it("resets after the window elapses", () => {
		let now = 1_000_000;
		const limiter = createRateLimiter({ windowMs: 60_000, maxPerWindow: 1, now: () => now });

		expect(limiter.check("a@synth.kitchen").allowed).toBe(true);
		expect(limiter.check("a@synth.kitchen").allowed).toBe(false);

		now += 60_001;
		expect(limiter.check("a@synth.kitchen").allowed).toBe(true);
	});
});
