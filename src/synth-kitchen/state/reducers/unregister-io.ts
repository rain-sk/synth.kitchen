import { IUnregisterIo } from '../actions/unregister-io';
import { ioKey } from '../types/io';
import { IState } from '../types/state';

export const unregisterIo: React.Reducer<IState, IUnregisterIo> = (
	state,
	{ payload: io }
) => {
	const key = ioKey(io);
	return {
		...state,
		io: Object.fromEntries(Object.entries(state.io).filter((k) => k[0] !== key))
	};
};
