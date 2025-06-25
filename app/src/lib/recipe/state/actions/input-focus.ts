export type IFocusInput = {
	type: 'FocusInput';
	payload: string;
};

export const focusInputAction = (inputKey: string): IFocusInput => ({
	type: 'FocusInput',
	payload: inputKey,
});
