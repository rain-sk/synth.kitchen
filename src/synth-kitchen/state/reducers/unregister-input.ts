import { IUnregisterInput } from '../actions/unregister-input';
import { IState } from '../types/state';

export const unregisterInput: React.Reducer<IState, IUnregisterInput> = (
	state,
	action
) => {
	const moduleInputs = state.inputs[action.payload.moduleKey];

	if (Object.keys(moduleInputs).length === 1) {
		return {
			...state,
			inputs: Object.fromEntries(
				Object.entries(state.inputs).filter(
					(entry) => entry[0] !== action.payload.moduleKey
				)
			)
		};
	} else {
		return {
			...state,
			inputs: {
				...state.inputs,
				[action.payload.moduleKey]: Object.fromEntries(
					Object.entries(moduleInputs).filter(
						(entry) => entry[0] !== `${action.payload.channel}`
					)
				)
			}
		};
	}
};
