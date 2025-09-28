import { Module } from 'synth.kitchen-shared';
import { IUpdateModuleState } from '../actions/update-module-state';
import { cloneAndApplyWithHistory } from '../types/patch';
import { IPatchState } from '../types/patch';

export const updateModuleState: React.Reducer<
	IPatchState,
	IUpdateModuleState
> = (state, action) => {
	const module = state.modules[action.payload.id];

	const modules: Record<string, Module> = {};
	for (const id of Object.keys(state.modules)) {
		modules[id] =
			id === action.payload.id
				? {
						...module,
						state: action.payload.state,
				  }
				: state.modules[id];
	}
	return cloneAndApplyWithHistory(state, {
		modules,
	});
};
