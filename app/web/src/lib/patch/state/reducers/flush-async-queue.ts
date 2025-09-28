import { IPatchState, cloneAndApply } from '../types/patch';
import { IPatchAction } from '../actions';

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
