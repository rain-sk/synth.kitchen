import { IRegisterIo } from '../actions/register-io';
import { ioKey } from '../types/io';
import { IState } from '../types/state';

export const registerIo: React.Reducer<IState, IRegisterIo> = (
	state,
	{ payload: io }
) => {
	return {
		...state,
		io: {
			...state.io,
			[ioKey(io)]: io
		}
	};
};
