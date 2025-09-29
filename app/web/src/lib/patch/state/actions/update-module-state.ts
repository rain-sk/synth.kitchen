import { ModuleState } from 'synth.kitchen-shared';

export type IUpdateModuleState = {
	type: 'UpdateModuleState';
	payload: {
		id: string;
		state: ModuleState[keyof ModuleState];
	};
};

export const updateModuleStateAction = (
	id: string,
	state: ModuleState[keyof ModuleState],
): IUpdateModuleState => ({
	type: 'UpdateModuleState',
	payload: {
		id,
		state,
	},
});
