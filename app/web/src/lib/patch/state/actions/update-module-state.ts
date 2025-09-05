import { ModuleState } from 'synth.kitchen-shared';

export type IUpdateModuleState = {
	type: 'UpdateModuleState';
	payload: {
		moduleKey: string;
		state: ModuleState[keyof ModuleState];
	};
};

export const updateModuleStateAction = (
	moduleKey: string,
	state: ModuleState[keyof ModuleState],
): IUpdateModuleState => ({
	type: 'UpdateModuleState',
	payload: {
		moduleKey,
		state,
	},
});
