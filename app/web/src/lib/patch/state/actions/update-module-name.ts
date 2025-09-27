export type IUpdateModuleName = {
	type: 'UpdateModuleName';
	payload: {
		id: string;
		name: string;
	};
};

export const updateModuleNameAction = (
	id: string,
	name: string,
): IUpdateModuleName => ({
	type: 'UpdateModuleName',
	payload: {
		id,
		name,
	},
});
