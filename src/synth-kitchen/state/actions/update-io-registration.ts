import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IIo, IoType } from '../types/io';

export type IUpdateIoRegistration = {
	type: 'UpdateIoRegistration';
	payload: IIo;
};

export const updateInputRegistrationAction = (
	moduleKey: string,
	channel: number,
	accessor: () => IAudioNode<IAudioContext>
): IUpdateIoRegistration => ({
	type: 'UpdateIoRegistration',
	payload: {
		moduleKey,
		channel,
		accessor,
		type: IoType.input
	}
});

export const updateOutputRegistrationAction = (
	moduleKey: string,
	channel: number,
	accessor: () => IAudioNode<IAudioContext>
): IUpdateIoRegistration => ({
	type: 'UpdateIoRegistration',
	payload: {
		moduleKey,
		channel,
		accessor,
		type: IoType.output
	}
});
