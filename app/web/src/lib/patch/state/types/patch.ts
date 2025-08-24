import type { PatchInfo, UserInfo } from 'synth.kitchen-shared';
import { IConnection, IConnectorInfo, IIo } from './connection';
import { IModule } from './module';
import { IParameter } from './parameter';
import { Modifier } from '../../constants/key';

export type Position = [number, number];
export const INVALID_POSITION: Position = [-1, -1];

export interface IPatchState extends PatchInfo {
	// patch info
	creator: UserInfo;

	// modules and parameters
	modules: Record<string, IModule>;
	modulePositions: Record<string, Position>;
	selectedModuleKeys: Set<string>;

	// i/o
	activeConnectorKey: string | undefined;
	connections: Record<string, IConnection>;
	connectors: Record<string, IConnectorInfo>;
	io: Record<string, IIo>;
	parameters: Record<string, IParameter>;

	// mouse info
	mouseDragStartPosition: Position;
	mouseDragPosition: Position;
	pendingSelection: Set<string> | undefined;

	// keyboard info
	heldModifiers: Modifier;
	focusedInput: string | undefined;
}
