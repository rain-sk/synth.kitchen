import { IPatchState, cloneAndApply } from '../types/patch';
import { IPatchAction } from '../actions';
import { IPushToAsyncQueue } from '../actions/async-queue';

export const flushAsyncQueue = (
	state: IPatchState,
	reducer: React.Reducer<IPatchState, IPatchAction>,
): IPatchState => {
	const asyncActionQueue = state.asyncActionQueue;
	state = cloneAndApply(state, { asyncActionQueue: [] });
	asyncActionQueue.forEach((action) => {
		state = reducer(state, action);
	});
	return state;
};

export const pushToAsyncQueue = (
	state: IPatchState,
	action: IPushToAsyncQueue,
): IPatchState =>
	cloneAndApply(state, {
		asyncActionQueue: Array.isArray(action.payload)
			? [...state.asyncActionQueue, ...action.payload]
			: [...state.asyncActionQueue, action.payload],
	});
