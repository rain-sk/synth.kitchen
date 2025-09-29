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
	action?: Partial<IPushToHistory>,
): IPatchState => {
	console.log('push-to-history');
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
	const history = state.history
		.slice(
			action?.historyPointer ? action.historyPointer : state.historyPointer,
		)
		.push(patchState, 0);
	const historyPointer = 0;
	return cloneAndApply(state, {
		history,
		historyPointer,
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

	const newConnections = new Set(
		incomingConnectionKeys.filter(
			(key) => !new Set(currentConnectionKeys).has(key),
		),
	);

	newConnections.forEach((key) => {
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

	const connectionsToLoad = stateToLoad.connections;
	stateToLoad.connections = {};
	Object.entries(connectionsToLoad)
		.filter(([key]) => !newConnections.has(key) || key in state.connections)
		.forEach(([key, value]) => {
			stateToLoad.connections[key] = value;
		});

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
	});
};

export const redo = (state: IPatchState) => {
	if (state.historyPointer <= 0) {
		return state.historyPointer === 0 ? state : pushToHistory(state);
	}

	return cloneAndApply(incrementHistoryPointer(state, -1), {
		activeConnectorKey: undefined,
		selectedConnections: new Set(),
		selectedModules: new Set(),
	});
};
