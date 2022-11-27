import { IModule } from './module';

export enum Modifier {
	NONE = 0,
	SHIFT = 1 << 0
}

export const INVALID_POSITION: [number, number] = [-1, -1];

export type IState = {
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
		def: {
			moduleKey: 'def',
			type: 'FILTER',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200
		},
		GLOBAL_OUT: {
			moduleKey: 'GLOBAL_OUT',
			type: 'OUTPUT',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200,
			state: { gain: 1 }
		},
		'123': {
			moduleKey: '123',
			type: 'OSCILLATOR',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200
		}
	},
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	selectedModuleKeys: new Set(),
	selectionPending: false
};
