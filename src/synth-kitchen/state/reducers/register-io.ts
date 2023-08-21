import { IRegisterIo } from '../actions/register-io';
import { IState } from '../types/state';

export const registerIo: React.Reducer<IState, IRegisterIo> = (
	state,
	action
) => {
	const oldModuleIo = state.io[action.payload.moduleKey] ?? {};

	const newModuleIo = {
		...oldModuleIo,
		[action.payload.type]: {
			...(oldModuleIo[action.payload.type] ?? {}),
			[action.payload.channel]: action.payload.accessor
		}
	};

	return {
		...state,
		io: {
			...state.io,
			[action.payload.moduleKey]: newModuleIo
		}
	};
};
