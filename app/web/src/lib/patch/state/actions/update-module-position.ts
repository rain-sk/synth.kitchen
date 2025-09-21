import { ModulePosition } from 'synth.kitchen-shared';

export type IUpdateModulePosition = {
	type: 'UpdateModulePosition';
	payload: {
		id: string;
		position: ModulePosition;
	};
};

export const updateModulePositionAction = (
	id: string,
	position: ModulePosition,
): IUpdateModulePosition => ({
	type: 'UpdateModulePosition',
	payload: {
		id,
		position,
	},
});
