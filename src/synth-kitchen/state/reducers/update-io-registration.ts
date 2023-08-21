import { IUpdateIoRegistration } from '../actions/update-io-registration';
import { ioKey } from '../types/io';
import { IState } from '../types/state';

export const updateIoRegistration: React.Reducer<
	IState,
	IUpdateIoRegistration
> = (state, { payload: io }) => {
	return {
		...state,
		io: {
			...state.io,
			[ioKey(io)]: io
		}
	};
};
