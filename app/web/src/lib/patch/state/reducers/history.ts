import { Input, Output, PatchState } from 'synth.kitchen-shared';
import { cloneAndApply, IPatchState } from '../types/patch';
import { IPushToHistory } from '../actions/history';
import { patchActions } from '../actions';
import { connect, connectorKey, disconnectSet } from '../connection';

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
	const history = state.history.push(patchState, state.historyPointer);
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

	const connectionsToDelete = currentConnectionKeys
		.filter((key) => !new Set(incomingConnectionKeys).has(key))
		.filter((key) => {
			const [output, input] = state.connections[key];
			return (
				output.moduleId in stateToLoad.modules &&
				input.moduleId in stateToLoad.modules
			);
		});
	state = cloneAndApply(
		state,
		disconnectSet(
			state.connections,
			state.connectors,
			new Set(connectionsToDelete),
		),
	);

	const connectionsToDelay = new Set(
		incomingConnectionKeys.filter(
			(key) => !new Set(currentConnectionKeys).has(key),
		),
	);

	connectionsToDelay.forEach((key) => {
		let [output, input] = stateToLoad.connections[key];
		const outputKey = connectorKey(output);
		const inputKey = connectorKey(input);
		if (outputKey in state.connectors && inputKey in state.connectors) {
			output = state.connectors[outputKey][0] as Output;
			input = state.connectors[inputKey][0] as Input;
			state = cloneAndApply(
				state,
				connect(state.connections, state.connectors, output, input),
			);
		} else {
			asyncActionQueue.push(patchActions.clearActiveConnectorAction());
			asyncActionQueue.push(patchActions.clickConnectorAction(output));
			asyncActionQueue.push(patchActions.clickConnectorAction(input));
		}
	});

	stateToLoad = {
		...stateToLoad,
		connections: Object.fromEntries(
			Object.entries(stateToLoad.connections).filter(
				([key]) => !connectionsToDelay.has(key) || key in state.connections,
			),
		),
	};

	asyncActionQueue.push(patchActions.unblockHistoryAction());
	return cloneAndApply(state, {
		...stateToLoad,
		asyncActionQueue,
	});
};

const incrementHistoryPointer = (state: IPatchState, direction: 1 | -1) => {
	const historyPointer = state.historyPointer + direction;
	const stateToLoad = state.history.load(historyPointer);

	return cloneAndApply(syncConnections(state, stateToLoad), {
		historyPointer,
	});
};

export const undo = (state: IPatchState) => {
	if (state.historyPointer + 1 === state.history.length) {
		return state;
	}

	if (state.historyPointer === -1) {
		state = pushToHistory(state);
	}
	return cloneAndApply(incrementHistoryPointer(state, 1), {
		activeConnectorKey: undefined,
		selectedConnections: new Set(),
		selectedModules: new Set(),
		asyncActionQueue: [
			...state.asyncActionQueue,
			patchActions.deselectAllModulesAction(),
			patchActions.clearActiveConnectorAction(),
		],
	});
};

export const redo = (state: IPatchState) => {
	if (state.historyPointer <= 0) {
		return state;
	}

	return cloneAndApply(incrementHistoryPointer(state, -1), {
		activeConnectorKey: undefined,
		selectedConnections: new Set(),
		selectedModules: new Set(),
		asyncActionQueue: [
			...state.asyncActionQueue,
			patchActions.deselectAllModulesAction(),
			patchActions.clearActiveConnectorAction(),
		],
	});
};
