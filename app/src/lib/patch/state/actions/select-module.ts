export enum SelectModuleType {
	DESELECT_ALL,
	DESELECT,
	SELECT,
	SELECT_SINGLE,
}

export type ISelectModule = {
	type: 'SelectModule';
	payload:
		| {
				moduleKey: string;
				type: SelectModuleType;
		  }
		| {
				moduleKey?: undefined;
				type: SelectModuleType.DESELECT_ALL;
		  };
};

export const deselectAllModulesAction = (): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		type: SelectModuleType.DESELECT_ALL,
	},
});

export const deselectModuleAction = (moduleKey: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		moduleKey,
		type: SelectModuleType.DESELECT,
	},
});

export const selectModuleAction = (moduleKey: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		moduleKey,
		type: SelectModuleType.SELECT,
	},
});

export const selectSingleModuleAction = (moduleKey: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		moduleKey,
		type: SelectModuleType.SELECT_SINGLE,
	},
});
