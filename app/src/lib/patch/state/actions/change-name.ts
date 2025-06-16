export type IChangeName = {
	type: 'ChangeName';
	payload: {
		name: string;
	};
};

export const changeNameAction = (name: string): IChangeName => ({
	type: 'ChangeName',
	payload: {
		name
	}
});
