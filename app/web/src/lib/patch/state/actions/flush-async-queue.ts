export type IFlushAsyncQueue = {
	type: 'FlushAsyncQueue';
};

export const flushAsyncQueueAction = (): IFlushAsyncQueue => ({
	type: 'FlushAsyncQueue',
});
