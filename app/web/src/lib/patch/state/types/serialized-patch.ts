import type { PatchState, PublicCreator } from 'synth.kitchen-shared';

export type ISerializedPatch = {
	id: string;
	name: string;
	slug: string;
	creator?: PublicCreator;
	state: PatchState;
};
