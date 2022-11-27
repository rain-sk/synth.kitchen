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
	selectedModuleKeys: Set<string>;
	selectionPending: boolean;
};

export const initialState: IState = {
	heldModifiers: Modifier.NONE,
	isDraggingModules: false,
	modules: {
		'0': {
			name: 'wah',
			moduleKey: '0',
			type: 'FILTER',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200
		},
		'1': {
			name: 'GLOBAL_OUT',
			moduleKey: '1',
			type: 'OUTPUT',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200,
			state: { gain: 1 }
		},
		'2': {
			name: 'osc',
			moduleKey: '2',
			type: 'OSCILLATOR',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200
		}
	},
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	name: randomName(),
	selectedModuleKeys: new Set(),
	selectionPending: false
};
