import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IInput } from '../types/input';

export type IRegisterInput = {
	type: 'RegisterInput';
	payload: IInput;
};

export const registerInputAction = (
	moduleKey: string,
	channel: number,
	accessor: () => IAudioNode<IAudioContext>
): IRegisterInput => ({
	type: 'RegisterInput',
	payload: {
		moduleKey,
		channel,
		accessor
	}
});
