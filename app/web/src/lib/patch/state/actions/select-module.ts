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
				id: string;
				type: SelectModuleType;
		  }
		| {
				id?: undefined;
				type: SelectModuleType.DESELECT_ALL;
		  };
};

export const deselectAllModulesAction = (): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		type: SelectModuleType.DESELECT_ALL,
	},
});

export const deselectModuleAction = (id: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		id,
		type: SelectModuleType.DESELECT,
	},
});

export const selectModuleAction = (id: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		id,
		type: SelectModuleType.SELECT,
	},
});

export const selectSingleModuleAction = (id: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		id,
		type: SelectModuleType.SELECT_SINGLE,
	},
});
