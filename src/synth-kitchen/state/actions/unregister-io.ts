import { IIo, IoType } from '../types/io';

export type IUnregisterIo = {
	type: 'UnregisterIo';
	payload: Omit<IIo, 'accessor'>;
};

export const unregisterInputAction = (
	moduleKey: string,
	channel: number
): IUnregisterIo => ({
	type: 'UnregisterIo',
	payload: {
		moduleKey,
		channel,
		type: IoType.input
	}
});

export const unregisterOutputAction = (
	moduleKey: string,
	channel: number
): IUnregisterIo => ({
	type: 'UnregisterIo',
	payload: {
		moduleKey,
		channel,
		type: IoType.output
	}
});
