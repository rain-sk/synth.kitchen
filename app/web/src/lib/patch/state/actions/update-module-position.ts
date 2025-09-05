import { ModulePosition } from 'synth.kitchen-shared';

export type IUpdateModulePosition = {
	type: 'UpdateModulePosition';
	payload: {
		moduleKey: string;
		position: ModulePosition;
	};
};

export const updateModulePositionAction = (
	moduleKey: string,
	position: ModulePosition,
): IUpdateModulePosition => ({
	type: 'UpdateModulePosition',
	payload: {
		moduleKey,
		position,
	},
});
