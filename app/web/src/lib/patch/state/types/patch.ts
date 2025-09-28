import {
	Connection,
	Connector,
	Io,
	ModulePosition,
	Parameter,
	PatchInfo,
	PatchState,
} from 'synth.kitchen-shared';

import { Modifier } from '../../constants/key';
import { IPatchAction } from '../actions';
import { MD5 } from '../../../shared/utils/md5';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import { pushToHistory } from '../reducers/history';

export type ConnectorInfo = [Connector, string[]];

type HistorySnapshot = {
	md5: string;
	state: string;
};

export class History {
	private stack: HistorySnapshot[] = [];
	private registry = new Set<string>();

	slice = (historyPointer: number): History => {
		const history = new History();

		history.stack = this.stack.slice(historyPointer);
		history.registry = new Set(Array.from(this.registry));

		return history;
	};

	push = (state: PatchState, historyPointer: number): History => {
		const json = JSON.stringify(state);
		const compressed = compressToBase64(json);
		const md5 = MD5(compressed);

		if (this.registry.has(md5)) {
			return this;
		}

		const snapshot: HistorySnapshot = {
			md5,
			state: compressed,
		};

		const history = new History();
		history.stack = [snapshot, ...this.stack.slice(historyPointer)];
		history.registry = new Set([md5, ...this.registry]);

		return history;
	};

	load = (historyPointer: number): PatchState => {
		const snapshot = this.stack[historyPointer];
		const json = decompressFromBase64(snapshot.state);
		return JSON.parse(json);
	};

	get length() {
		return this.stack.length;
	}
}

export type IPatchState = PatchInfo &
	PatchState & {
		// selection
		selectedModules: Set<string>;
		selectedConnections: Set<string>;

		// i/o
		activeConnectorKey: string | undefined;
		connections: Record<string, Connection>;
		connectors: Record<string, ConnectorInfo>;
		io: Record<string, Io>;
		parameters: Record<string, Parameter>;

		// mouse info
		mouseDragStartPosition: ModulePosition;
		mouseDragPosition: ModulePosition;
		pendingModuleSelection: Set<string> | undefined;
		pendingConnectionSelection: Set<string> | undefined;

		// keyboard info
		heldModifiers: Modifier;
		focusedInput: string | undefined;

		// history
		history: History;
		historyPointer: number;
		blockHistory: boolean;

		// async work queue
		asyncActionQueue: IPatchAction[];
	};

export const cloneAndApply = (
	state: IPatchState,
	update: Partial<IPatchState>,
) => {
	const newState: IPatchState = {
		// PatchInfo
		id: state.id,
		name: state.name,
		slug: state.slug,
		creator: state.creator,

		// PatchState
		modules: state.modules,
		modulePositions: state.modulePositions,
		selectedConnections: state.selectedConnections,
		selectedModules: state.selectedModules,

		// i/o
		activeConnectorKey: state.activeConnectorKey,
		connections: state.connections,
		connectors: state.connectors,
		io: state.io,
		parameters: state.parameters,

		// mouse info
		mouseDragStartPosition: state.mouseDragStartPosition,
		mouseDragPosition: state.mouseDragPosition,
		pendingConnectionSelection: state.pendingConnectionSelection,
		pendingModuleSelection: state.pendingModuleSelection,

		// keyboard info
		heldModifiers: state.heldModifiers,
		focusedInput: state.focusedInput,

		history: state.history,
		historyPointer: state.historyPointer,
		blockHistory: state.blockHistory,

		asyncActionQueue: state.asyncActionQueue,
	};
	for (let key in update) {
		(newState as any)[key] = (update as any)[key];
	}
	return newState;
};

export const cloneAndApplyWithHistory = (
	state: IPatchState,
	update: Partial<Omit<IPatchState, 'historyPointer'>>,
): IPatchState =>
	cloneAndApply(pushToHistory(state), { ...update, historyPointer: -1 });
