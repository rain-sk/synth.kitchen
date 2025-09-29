import { ModuleState } from 'synth.kitchen-shared';

export type IUpdateModuleState = {
	type: 'UpdateModuleState';
	payload: {
		id: string;
		state: ModuleState[keyof ModuleState];
		firstUpdate: boolean;
	};
};

export const updateModuleStateAction = (
	id: string,
	state: ModuleState[keyof ModuleState],
	firstUpdate: boolean = false,
): IUpdateModuleState => ({
	type: 'UpdateModuleState',
	payload: {
		id,
		state,
		firstUpdate,
	},
});
