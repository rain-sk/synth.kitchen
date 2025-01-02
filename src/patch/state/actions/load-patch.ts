import { ISerializedPatch } from '../types/serialized-patch';

export type ILoadPatch = {
	type: 'LoadPatch';
	payload: {
		patch: ISerializedPatch;
	};
};

export const loadPatchAction = (patch: ISerializedPatch): ILoadPatch => ({
	type: 'LoadPatch',
	payload: {
		patch
	}
});
