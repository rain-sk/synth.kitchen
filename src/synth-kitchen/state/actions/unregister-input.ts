import { IInput } from '../types/input';

export type IUnregisterInput = {
	type: 'UnregisterInput';
	payload: Omit<IInput, 'accessor'>;
};

export const unregisterInputAction = (
	moduleKey: string,
	channel: number
): IUnregisterInput => ({
	type: 'UnregisterInput',
	payload: {
		moduleKey,
		channel
	}
});
