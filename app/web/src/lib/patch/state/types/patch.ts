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

export type ConnectorInfo = [Connector, string[]];

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
	};
	for (let key in update) {
		(newState as any)[key] = (update as any)[key];
	}
	return newState;
};
