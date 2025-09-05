import { ModulePosition, ModuleType } from 'synth.kitchen-shared';

export type IAddModule = {
	type: 'AddModule';
	payload: {
		type: ModuleType;
		position?: ModulePosition;
	};
};

export const addModuleAction = (
	type: ModuleType,
	position?: ModulePosition,
): IAddModule => ({
	type: 'AddModule',
	payload: {
		type,
		position,
	},
});
