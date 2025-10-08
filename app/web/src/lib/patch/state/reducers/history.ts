import { CONNECTIONS_STATE_VERSIONS, PatchState } from 'synth.kitchen-shared';
import { cloneAndApply, IPatchState } from '../types/patch';
import { IPushToHistory } from '../actions/history';
import { connectionKey, connectorKey, disconnectSet } from '../connection';
import { updateModuleState } from './update-module-state';
import { connect } from './connection';

export const blockHistory = (state: IPatchState) => {
	console.log('blocking');
	return cloneAndApply(state, { blockHistory: true });
};

export const unblockHistory = (state: IPatchState) => {
	console.log('unblocking');
	return cloneAndApply(state, { blockHistory: false });
};

export const pushToHistory = (
	state: IPatchState,
	action?: Partial<IPushToHistory>,
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
	const history = state.history
		.slice(action?.historyPointer ?? state.historyPointer)
		.push(patchState, 0);
	const historyPointer = 0;
	return cloneAndApply(state, {
		history,
		historyPointer,
	});
};

const syncConnections = (
	state: IPatchState,
	stateToLoad: PatchState & Partial<IPatchState>,
): IPatchState => {
	const blocked = state.blockHistory;
	if (!blocked) {
		state = blockHistory(state);
	}

	const currentConnectionKeys = Object.keys(state.connections);
	const incomingConnectionKeys = Object.keys(stateToLoad.connections);

	// Delete outgoing connections
	const connectionsToDelete = currentConnectionKeys
		.filter((key) => !new Set(incomingConnectionKeys).has(key))
		.filter((key) => {
			const [output, input] = state.connections.state[key];
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

	// Connect what we can
	const connectionsToLoadNow = incomingConnectionKeys
		.map((key) => stateToLoad.connections.state[key])
		.filter(
			([output, input]) =>
				output.moduleId in state.modules &&
				input.moduleId in state.modules &&
				connectorKey(output) in state.connectors &&
				connectorKey(input) in state.connectors,
		);
	const loaded = new Set<string>();
	for (const [output, input] of connectionsToLoadNow) {
		const key = connectionKey(output, input);
		state = connect(state, { payload: [output, input], type: 'Connect' });
		if (key in state.connections) {
			loaded.add(key);
		}
	}

	// Defer the rest
	const newConnectionsState = Object.fromEntries(
		incomingConnectionKeys
			.filter((key) => !loaded.has(key))
			.map((key) => [key, stateToLoad.connections.state[key]]),
	);
	stateToLoad.connectionsToLoad = {
		version: CONNECTIONS_STATE_VERSIONS[0],
		state: newConnectionsState,
	};

	for (const id in stateToLoad.modules) {
		if (id in state.modules) {
			state = updateModuleState(state, {
				type: 'UpdateModuleState',
				payload: { id, state: stateToLoad.modules[id].state },
			});
		}
	}

	return blocked
		? cloneAndApply(state, stateToLoad)
		: unblockHistory(cloneAndApply(state, stateToLoad));
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
