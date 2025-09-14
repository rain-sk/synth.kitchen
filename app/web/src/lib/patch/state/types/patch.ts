import {
	Connection,
	Connector,
	Io,
	Module,
	ModulePosition,
	Parameter,
	PatchInfo,
	PatchState,
	UserInfo,
} from 'synth.kitchen-shared';
import { Modifier } from '../../constants/key';

export type ConnectorInfo = [Connector, string[]];

export type IPatchState = PatchInfo &
	PatchState & {
		// PatchInfo:
		id: string;
		name: string;
		slug: string;
		creator: UserInfo;

		// PatchState:
		modules: Record<string, Module>;
		modulePositions: Record<string, ModulePosition>;
		selectedModuleKeys: Set<string>;

		// i/o
		activeConnectorKey: string | undefined;
		connections: Record<string, Connection>;
		connectors: Record<string, ConnectorInfo>;
		io: Record<string, Io>;
		parameters: Record<string, Parameter>;

		// mouse info
		mouseDragStartPosition: ModulePosition;
		mouseDragPosition: ModulePosition;
		pendingSelection: Set<string> | undefined;

		// keyboard info
		heldModifiers: Modifier;
		focusedInput: string | undefined;
	};
