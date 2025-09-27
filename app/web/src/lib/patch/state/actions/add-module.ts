import { ModulePosition, ModuleType } from 'synth.kitchen-shared';

type AddModuleOptions = {
	id?: string;
};

export type IAddModule = {
	type: 'AddModule';
	payload: {
		type: ModuleType;
		position: ModulePosition;
		options?: AddModuleOptions;
	};
};

export const addModuleAction = (
	type: ModuleType,
	position: ModulePosition,
	options?: AddModuleOptions,
): IAddModule => ({
	type: 'AddModule',
	payload: {
		type,
		position,
		options,
	},
});
