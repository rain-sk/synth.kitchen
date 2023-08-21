import { IAudioContext, IAudioNode } from 'standardized-audio-context';
import { IIo, IoType } from '../types/io';

export type IRegisterIo = {
	type: 'RegisterIo';
	payload: IIo;
};

export const registerInputAction = (
	moduleKey: string,
	channel: number,
	accessor: () => IAudioNode<IAudioContext>
): IRegisterIo => ({
	type: 'RegisterIo',
	payload: {
		moduleKey,
		channel,
		accessor,
		type: IoType.input
	}
});

export const registerOutputAction = (
	moduleKey: string,
	channel: number,
	accessor: () => IAudioNode<IAudioContext>
): IRegisterIo => ({
	type: 'RegisterIo',
	payload: {
		moduleKey,
		channel,
		accessor,
		type: IoType.output
	}
});
