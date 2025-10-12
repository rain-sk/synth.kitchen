export type ISelectModules = {
	type: 'SelectModules';
	payload: Set<string>;
};

export const selectModulesAction = (
	moduleIds: Set<string>,
): ISelectModules => ({
	type: 'SelectModules',
	payload: moduleIds,
});
