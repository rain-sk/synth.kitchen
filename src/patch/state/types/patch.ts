import { IConnectorInfo, IInput, IIo, IOutput } from './connection';
import { IModule } from './module';
import { IParameter } from './parameter';
import { Modifier } from '../../../constants/key';

export type Position = [number, number];
export const INVALID_POSITION: Position = [-1, -1];

export type IPatchState = {
	// patch info
	id: string;
	name: string;

	// modules and parameters
	modules: Record<string, IModule>;
	modulePositions: Record<string, Position>;
	selectedModuleKeys: Set<string>;

	// i/o
	activeConnectorKey: string | undefined;
	connections: Record<string, [IOutput, IInput]>;
	connectors: Record<string, IConnectorInfo>;
	io: Record<string, IIo>;
	parameters: Record<string, IParameter>;

	// mouse info
	mouseDragStartPosition: Position;
	mouseDragPosition: Position;
	selectionPending: boolean;

	// keyboard info
	heldModifiers: Modifier;
	isKeyMovementEnabled: boolean;

	// misc.
	loadingFromCloud: boolean;
};
