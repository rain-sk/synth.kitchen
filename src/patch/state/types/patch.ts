import { IInput, IIo, IOutput } from './connection';
import { IModule } from './module';
import { IParameter } from './parameter';
import { Modifier } from '../../../constants/key';

export type Position = [number, number];
export const INVALID_POSITION: Position = [-1, -1];

export type IPatchState = {
	name: string;
	id: string;
	modules: Record<string, IModule>;
	heldModifiers: Modifier;
	isKeyMovementEnabled: boolean;
	modulePositions: Record<string, Position>;
	mouseDragStartPosition: Position;
	mouseDragPosition: Position;
	selectedModuleKeys: Set<string>;
	selectionPending: boolean;
	parameters: Record<string, IParameter>;
	io: Record<string, IIo>;
	connectionsToLoad?: Record<string, [IOutput, IInput]>;
	loadingFromCloud: boolean;
};
