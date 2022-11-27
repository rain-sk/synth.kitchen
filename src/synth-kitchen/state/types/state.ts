import { randomName } from '../../utils/random-name';
import { IModule } from './module';
import { IPatch } from './patch';

export enum Modifier {
	NONE = 0,
	SHIFT = 1 << 0
}

export const INVALID_POSITION: [number, number] = [-1, -1];

export type IState = IPatch & {
	heldModifiers: Modifier;
	isDraggingModules: boolean;
	modules: Record<string, IModule>;
	mouseDragStartPosition: [number, number];
	mouseDragPosition: [number, number];
	patchHistory: IPatch[];
	patchHistoryOffset: number;
	selectedModuleKeys: Set<string>;
	selectionPending: boolean;
};

export const initialState: IState = {
	heldModifiers: Modifier.NONE,
	isDraggingModules: false,
	modules: {
		'0': {
			name: 'GLOBAL_OUT',
			moduleKey: '0',
			type: 'OUTPUT',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 400),
			width: 200,
			height: 200,
			state: { gain: 1 }
		}
	},
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	name: randomName(),
	patchHistory: [],
	patchHistoryOffset: 0,
	selectedModuleKeys: new Set(),
	selectionPending: false
};
