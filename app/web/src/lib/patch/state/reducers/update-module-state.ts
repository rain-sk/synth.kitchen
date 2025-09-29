import { Module } from 'synth.kitchen-shared';
import { IUpdateModuleState } from '../actions/update-module-state';
import { cloneAndApplyWithHistory } from '../types/patch';
import { IPatchState } from '../types/patch';

export const updateModuleState: React.Reducer<
	IPatchState,
	IUpdateModuleState
> = (state, action) => {
	const module = state.modules[action.payload.id];
	const newState = action.payload.state;
	if (
		module.state &&
		Object.keys(newState).every(
			(key) => (module.state as any)[key] === (newState as any)[key],
		)
	) {
		return state;
	}

	const modules: Record<string, Module> = {};
	for (const id of Object.keys(state.modules)) {
		if (id === action.payload.id) {
			modules[id] = {
				...module,
				state: action.payload.state,
			};
		} else {
			modules[id] = state.modules[id];
		}
	}
	return cloneAndApplyWithHistory(state, { modules });
};
