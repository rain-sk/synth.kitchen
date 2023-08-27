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
	isDraggingModules: boolean;
	modules: Record<string, IModule>;
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

export const initialState: IState = {
	heldModifiers: Modifier.NONE,
	isDraggingModules: false,
	isKeyMovementEnabled: true,
	modules: {
		'0': {
			name: 'GLOBAL_OUT',
			moduleKey: '0',
			type: 'OUTPUT',
			x: document.documentElement.scrollWidth / 1.47,
			y: document.documentElement.scrollHeight / 1.8,
			state: { gain: 0.33 }
		}
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
};
