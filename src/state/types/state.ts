import { IInput, IOutput } from '../../contexts/connection';
import { randomId } from '../../utils/random-id';
import { randomName } from '../../utils/random-name';
import { IIo } from './io';
import { IModule } from './module';
import { IParameter } from './parameter';

export enum Modifier {
	NONE = 0,
	SHIFT = 1 << 0,
	SPECIAL = 1 << 1,
	CONTROL = 1 << 2,
}

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

export const blankPatch = (): IPatchState => ({
	id: randomId(),
	heldModifiers: Modifier.NONE,
	isKeyMovementEnabled: true,
	modules: {
		'0': {
			name: 'output',
			moduleKey: '0',
			type: 'OUTPUT',
			state: { gain: 0.45 },
		},
	},
	modulePositions: {
		'0': [50, 50],
	},
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	name: randomName(),
	selectedModuleKeys: new Set(),
	selectionPending: false,
	parameters: {},
	io: {},
	loadingFromCloud: false,
});
