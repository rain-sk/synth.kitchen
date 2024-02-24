export type IUpdateModulePosition = {
	type: 'UpdateModulePosition';
	payload: {
		moduleKey: string;
		position: [number, number];
	};
};

export const updateModulePositionAction = (
	moduleKey: string,
	position: [number, number]
): IUpdateModulePosition => ({
	type: 'UpdateModulePosition',
	payload: {
		moduleKey,
		position
	}
});
