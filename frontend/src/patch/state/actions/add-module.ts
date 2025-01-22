import { ModuleType } from '../types/module';
import { Position } from '../types/patch';

export type IAddModule = {
	type: 'AddModule';
	payload: {
		type: ModuleType;
		position?: Position;
	};
};

export const addModuleAction = (
	type: ModuleType,
	position?: Position,
): IAddModule => ({
	type: 'AddModule',
	payload: {
		type,
		position,
	},
});
