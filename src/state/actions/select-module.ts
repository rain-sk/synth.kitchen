export enum SelectModuleType {
	DESELECT,
	SELECT,
	SELECT_SINGLE
}

export type ISelectModule = {
	type: 'SelectModule';
	payload: {
		moduleKey: string;
		type: SelectModuleType;
	};
};

export const deselectModuleAction = (moduleKey: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		moduleKey,
		type: SelectModuleType.DESELECT
	}
});

export const selectModuleAction = (moduleKey: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		moduleKey,
		type: SelectModuleType.SELECT
	}
});

export const selectSingleModuleAction = (moduleKey: string): ISelectModule => ({
	type: 'SelectModule',
	payload: {
		moduleKey,
		type: SelectModuleType.SELECT_SINGLE
	}
});
