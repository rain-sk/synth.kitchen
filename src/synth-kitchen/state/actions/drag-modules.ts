export type IDragModules = {
	type: 'DragModules';
	payload: {
		isDraggingModules: boolean;
	};
};

export const dragModulesAction = (
	isDraggingModules: boolean
): IDragModules => ({
	type: 'DragModules',
	payload: {
		isDraggingModules
	}
});
