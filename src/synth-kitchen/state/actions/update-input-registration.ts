import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IInput } from '../types/input';

export type IUpdateInputRegistration = {
	type: 'UpdateInputRegistration';
	payload: IInput;
};

export const updateInputRegistrationAction = (
	moduleKey: string,
	channel: number,
	accessor: () => IAudioNode<IAudioContext>
): IUpdateInputRegistration => ({
	type: 'UpdateInputRegistration',
	payload: {
		moduleKey,
		channel,
		accessor
	}
});
