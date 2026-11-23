import {
	PatchState,
	APP_STATE_VERSION,
	upgradePatchState,
} from 'synth.kitchen-shared';

import { ISerializedPatch } from '../state/types/serialized-patch';

const prefix = 'synth.kitchen:draft:';

export const NEW_PATCH = 'new';

export type Draft = {
	version: string;
	savedAt: string;
	patch: ISerializedPatch;
};

export const draftKey = (id?: string) => `${prefix}${id || NEW_PATCH}`;

const isDraft = (value: unknown): value is Draft => {
	const draft = value as Draft;
	return (
		!!draft &&
		typeof draft.savedAt === 'string' &&
		!!draft.patch &&
		typeof draft.patch === 'object' &&
		!!draft.patch.state
	);
};

export const writeDraft = (
	id: string | undefined,
	patch: ISerializedPatch,
): boolean => {
	try {
		localStorage.setItem(
			draftKey(id),
			JSON.stringify({
				version: APP_STATE_VERSION,
				savedAt: new Date().toISOString(),
				patch,
			} satisfies Draft),
		);
		return true;
	} catch {
		return false;
	}
};

export const readDraft = (id?: string): Draft | null => {
	const raw = localStorage.getItem(draftKey(id));
	if (!raw) return null;

	try {
		const parsed: unknown = JSON.parse(raw);
		if (!isDraft(parsed)) throw new Error('draft: not a draft');

		const state: PatchState = upgradePatchState(parsed.patch.state as never);

		if (parsed.version !== APP_STATE_VERSION) {
			localStorage.setItem(
				draftKey(id),
				JSON.stringify({ ...parsed, version: APP_STATE_VERSION }),
			);
		}

		return { ...parsed, patch: { ...parsed.patch, state } };
	} catch {
		localStorage.removeItem(draftKey(id));
		return null;
	}
};

export const clearDraft = (id?: string) => {
	localStorage.removeItem(draftKey(id));
};

export const sameState = (a?: PatchState, b?: PatchState) => {
	if (!a || !b) return false;
	try {
		return JSON.stringify(a) === JSON.stringify(b);
	} catch {
		return false;
	}
};
