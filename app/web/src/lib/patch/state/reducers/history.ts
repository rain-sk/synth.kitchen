import { PatchState } from 'synth.kitchen-shared';
import { cloneAndApply, IPatchState } from '../types/patch';
import { IPushToHistory } from '../actions/history';
import { patchActions } from '../actions';
import { MD5 } from '../../../shared/utils/md5';

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

const syncConnections = (
	state: IPatchState,
	stateToLoad: PatchState,
): IPatchState => {
	const asyncActionQueue = state.asyncActionQueue.slice();
	asyncActionQueue.push(patchActions.blockHistoryAction());

	const currentConnectionKeys = Object.keys(state.connections);
	const incomingConnectionKeys = Object.keys(stateToLoad.connections);

	const deletionsToDelay = currentConnectionKeys
		.filter((key) => !new Set(incomingConnectionKeys).has(key))
		.filter((key) => {
			const [output, input] = state.connections[key];
			return (
				output.moduleId in stateToLoad.modules &&
				input.moduleId in stateToLoad.modules
			);
		});
	deletionsToDelay.forEach((key) => {
		const connection = state.connections[key];
		stateToLoad.connections[key] = connection;

		const [output, input] = connection;
		asyncActionQueue.push(patchActions.clearActiveConnectorAction());
		asyncActionQueue.push(patchActions.clickConnectorAction(output));
		asyncActionQueue.push(patchActions.clickConnectorAction(input));
	});

	const connectionsToDelay = new Set(
		incomingConnectionKeys.filter(
			(key) => !new Set(currentConnectionKeys).has(key),
		),
	);

	connectionsToDelay.forEach((key) => {
		const [output, input] = stateToLoad.connections[key];
		asyncActionQueue.push(patchActions.clearActiveConnectorAction());
		asyncActionQueue.push(patchActions.clickConnectorAction(output));
		asyncActionQueue.push(patchActions.clickConnectorAction(input));
	});

	stateToLoad.connections = Object.fromEntries(
		Object.entries(stateToLoad.connections).filter(
			([key]) => !connectionsToDelay.has(key),
		),
	);

	asyncActionQueue.push(patchActions.unblockHistoryAction());
	const newState = cloneAndApply(state, {
		...stateToLoad,
		asyncActionQueue,
	});

	return newState;
};

const incrementHistoryPointer = (state: IPatchState, direction: 1 | -1) => {
	console.log(`INCREMENT HISTORY: ${direction}`);
	console.log('history', state.history);
	console.log('historyPointer', state.historyPointer);
	const historyPointer = state.historyPointer + direction;
	const stateToLoad = state.history[historyPointer];

	const newState = cloneAndApply(syncConnections(state, stateToLoad), {
		historyPointer,
	});

	// DEBUG
	const stateMd5 = MD5(JSON.stringify(state));
	const stateToLoadMd5 = MD5(JSON.stringify(stateToLoad));
	console.log({ stateMd5, stateToLoadMd5 });
	console.log(newState.asyncActionQueue);
	return newState;
};

export const undo = (state: IPatchState) => {
	if (state.historyPointer + 1 === state.history.length) {
		return state;
	}

	if (state.historyPointer === -1) {
		state = pushToHistory(state);
	}

	return incrementHistoryPointer(state, 1);
};

export const redo = (state: IPatchState) => {
	if (state.historyPointer <= 0) {
		return state;
	}

	return incrementHistoryPointer(state, -1);
};
