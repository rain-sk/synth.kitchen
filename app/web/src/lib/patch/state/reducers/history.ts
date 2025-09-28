import { PatchState } from 'synth.kitchen-shared';
import { cloneAndApply, IPatchState } from '../types/patch';
import { IPushToHistory } from '../actions/history';

export const blockHistory = (state: IPatchState) => {
	return cloneAndApply(state, { blockHistory: true });
};

export const unblockHistory = (state: IPatchState) => {
	return cloneAndApply(state, { blockHistory: false });
};

export const pushToHistory = (
	state: IPatchState,
	action?: IPushToHistory,
): IPatchState => {
	if (state.blockHistory) {
		if (action?.force) {
			state = unblockHistory(state);
		} else {
			return state;
		}
	}

	const patchState: PatchState = {
		modules: state.modules,
		modulePositions: state.modulePositions,
		connections: state.connections,
		name: state.name,
	};
	const history = [
		patchState,
		...(state.historyPointer <= 0
			? state.history
			: state.history.slice(state.historyPointer)),
	];
	return cloneAndApply(state, {
		history,
		historyPointer: 0,
	});
};

export const undo = (state: IPatchState) => {
	if (state.historyPointer + 1 === state.history.length) {
		console.log('undo');
		return state;
	}

	if (state.historyPointer === -1) {
		state = pushToHistory(state);
	}

	const historyPointer = state.historyPointer + 1;
	const stateToLoad = state.history[historyPointer];

	return cloneAndApply(state, { ...stateToLoad, historyPointer });
};

export const redo = (state: IPatchState) => {
	if (state.historyPointer <= 0) {
		return state;
	}

	const historyPointer = state.historyPointer - 1;
	const stateToLoad = state.history[historyPointer];

	return cloneAndApply(state, { ...stateToLoad, historyPointer });
};
