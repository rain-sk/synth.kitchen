export type ISelectConnection = {
	type: 'SelectConnection';
	payload: {
		connectionKeys: string[];
		toggle?: boolean;
	};
};

export const selectConnectionAction = (
	connectionKeys: string[],
	toggle = false,
): ISelectConnection => ({
	type: 'SelectConnection',
	payload: { connectionKeys, toggle },
});
