import { IConnectorInfo, IInput, IIo, IOutput } from './connection';
import { IModule } from './module';
import { IParameter } from './parameter';
import { Modifier } from '../../constants/key';
import { RecipeInfo, UserInfo } from 'shared';

export type Position = [number, number];
export const INVALID_POSITION: Position = [-1, -1];

export interface IRecipeState extends RecipeInfo {
	// recipe info
	id: string;
	name: string;
	chef: UserInfo;

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
	pendingSelection: Set<string> | undefined;

	// keyboard info
	heldModifiers: Modifier;
	focusedInput: string | undefined;
}
