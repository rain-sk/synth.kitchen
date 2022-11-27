import { ModuleType } from '../types/module';

export type IAddModule = {
	type: 'AddModule';
	payload: {
		type: ModuleType;
	};
};

export const addModuleAction = (type: ModuleType): IAddModule => ({
	type: 'AddModule',
	payload: {
		type
	}
});
