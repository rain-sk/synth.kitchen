export type IUpdateModulePosition = {
	type: 'UpdateModulePosition';
	payload: {
		moduleKey: string;
		x: number;
		y: number;
	};
};

export const updateModulePositionAction = (
	moduleKey: string,
	x: number,
	y: number
): IUpdateModulePosition => ({
	type: 'UpdateModulePosition',
	payload: {
		moduleKey,
		x,
		y
	}
});
