import { Position } from '../types/patch';

export type IUpdateModulePosition = {
	type: 'UpdateModulePosition';
	payload: {
		moduleKey: string;
		position: Position;
	};
};

export const updateModulePositionAction = (
	moduleKey: string,
	position: Position,
): IUpdateModulePosition => ({
	type: 'UpdateModulePosition',
	payload: {
		moduleKey,
		position,
	},
});
