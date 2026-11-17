export enum SelectConnectionMode {
	REPLACE,
	ADD,
	TOGGLE,
}

export type ISelectConnection = {
	type: 'SelectConnection';
	payload: {
		connectionKeys: string[];
		mode?: SelectConnectionMode;
	};
};

export const selectConnectionAction = (
	connectionKeys: string[],
	mode = SelectConnectionMode.REPLACE,
): ISelectConnection => ({
	type: 'SelectConnection',
	payload: { connectionKeys, mode },
});
