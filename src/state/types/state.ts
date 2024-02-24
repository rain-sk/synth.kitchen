import { randomName } from '../../utils/random-name';
import { IIo } from './io';
import { IModule } from './module';
import { IParameter } from './parameter';
import { IPatch } from './patch';

export enum Modifier {
	NONE = 0,
	SHIFT = 1 << 0
}

export const INVALID_POSITION: [number, number] = [-1, -1];

export type IState = IPatch & {
	heldModifiers: Modifier;
	isKeyMovementEnabled: boolean;
	modules: Record<string, IModule>;
	modulePositions: Record<string, [number, number]>;
	mouseDragStartPosition: [number, number];
	mouseDragPosition: [number, number];
	patchHistory: IPatch[];
	patchHistoryOffset: number;
	selectedModuleKeys: Set<string>;
	selectionPending: boolean;
	parameters: Record<string, IParameter>;
	io: Record<string, IIo>;
	connections: Record<string, boolean>;
};

export const blankState = (): IState => ({
	heldModifiers: Modifier.NONE,
	isKeyMovementEnabled: true,
	modules: {
		'0': {
			name: 'output',
			moduleKey: '0',
			type: 'OUTPUT',
			state: { gain: 0.45 }
		}
	},
	modulePositions: {
		'0': [50, 50]
	},
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	name: randomName(),
	patchHistory: [],
	patchHistoryOffset: -1,
	selectedModuleKeys: new Set(),
	selectionPending: false,
	parameters: {},
	io: {},
	connections: {}
});

export const initialState: IState = blankState();
