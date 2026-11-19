import { describe, expect, it } from 'vitest';

import { randomName } from './randomName';

const segments = (name: string) => name.split('-');

describe('randomName', () => {
	it('appends a custom noun as the trailing segment', () => {
		const name = randomName('patch');

		expect(segments(name)).toHaveLength(3);
		expect(name.endsWith('-patch')).toBe(true);
	});

	it('keeps the custom noun exact, including multi-hyphen nouns', () => {
		const name = randomName('mini-sync');

		expect(name.endsWith('-mini-sync')).toBe(true);
		expect(segments(name).slice(-2)).toEqual(['mini', 'sync']);
	});

	it('produces a three-part lowercase name with no custom noun', () => {
		for (let i = 0; i < 25; i++) {
			const name = randomName();
			const parts = segments(name);

			expect(parts).toHaveLength(3);
			expect(name).toBe(name.toLowerCase());
			parts.forEach((part) => expect(part.length).toBeGreaterThan(0));
		}
	});

	it('alliterates the default branch', () => {
		const initials = new Set<string>();

		for (let i = 0; i < 40; i++) {
			const parts = segments(randomName());
			const initial = parts[0][0];

			parts.forEach((part) => expect(part[0]).toBe(initial));
			initials.add(initial);
		}

		expect(initials.size).toBeGreaterThan(1);
	});

	it('never emits the blocked word', () => {
		for (let i = 0; i < 100; i++) {
			expect(randomName()).not.toMatch(/slave/);
		}
	});

	it('is never identical twice', () => {
		const names = new Set<string>();

		for (let i = 0; i < 60; i++) {
			names.add(randomName());
		}

		expect(names.size).toBeGreaterThan(1);
	});
});
