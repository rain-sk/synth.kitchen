import { IModuleState } from '../types/module';

export type IUpdateModuleState = {
	type: 'UpdateModuleState';
	payload: {
		moduleKey: string;
		state: IModuleState[keyof IModuleState];
	};
};

export const updateModuleStateAction = (
	moduleKey: string,
	state: IModuleState[keyof IModuleState]
): IUpdateModuleState => ({
	type: 'UpdateModuleState',
	payload: {
		moduleKey,
		state
	}
});
