import { IPatch } from '../types/patch';

export type ILoadPatch = {
	type: 'LoadPatch';
	payload: {
		patch: IPatch;
	};
};

export const loadPatchAction = (patch: IPatch): ILoadPatch => ({
	type: 'LoadPatch',
	payload: {
		patch
	}
});
