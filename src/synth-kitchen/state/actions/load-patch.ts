import { IModule } from '../types/module';

export type ILoadPatch = {
	type: 'LoadPatch';
	payload: {
		modules: Record<string, IModule>;
	};
};

export const loadPatchAction = (
	modules: Record<string, IModule>
): ILoadPatch => ({
	type: 'LoadPatch',
	payload: {
		modules
	}
});
