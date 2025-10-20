import { IPatchAction } from '.';

export type IFlushAsyncQueue = {
	type: 'FlushAsyncQueue';
};

export const flushAsyncQueueAction = (): IFlushAsyncQueue => ({
	type: 'FlushAsyncQueue',
});

export type IPushToAsyncQueue = {
	type: 'PushToAsyncQueue';
	payload: IPatchAction | IPatchAction[];
};

export const pushToAsyncQueue = (
	payload: IPatchAction | IPatchAction[],
): IPushToAsyncQueue => ({
	type: 'PushToAsyncQueue',
	payload,
});
