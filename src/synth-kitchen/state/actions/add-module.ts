import { ModuleType } from '../types/module';

export type IAddModule = {
	type: 'AddModule';
	payload: {
		type: ModuleType;
		position?: [number, number];
	};
};

export const addModuleAction = (
	type: ModuleType,
	position?: [number, number]
): IAddModule => ({
	type: 'AddModule',
	payload: {
		type,
		position
	}
});
