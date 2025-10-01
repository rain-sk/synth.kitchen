import type { PatchState, UserInfo } from 'synth.kitchen-shared';

export type ISerializedPatch = {
	id: string;
	name: string;
	slug: string;
	creator?: UserInfo;
	state: PatchState;
};
