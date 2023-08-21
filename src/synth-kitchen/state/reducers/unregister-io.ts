import { IUnregisterIo } from '../actions/unregister-io';
import { IState } from '../types/state';

export const unregisterIo: React.Reducer<IState, IUnregisterIo> = (
	state,
	action
) => {
	const moduleIos = state.io[action.payload.moduleKey];

	if (Object.keys(moduleIos).length === 1) {
		return {
			...state,
			ios: Object.fromEntries(
				Object.entries(state.io).filter(
					(entry) => entry[0] !== action.payload.moduleKey
				)
			)
		};
	} else {
		return {
			...state,
			ios: {
				...state.io,
				[action.payload.moduleKey]: Object.fromEntries(
					Object.entries(moduleIos).filter(
						(entry) => entry[0] !== `${action.payload.channel}`
					)
				)
			}
		};
	}
};
