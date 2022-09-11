import { IModule, ModuleSelectionState } from './module';

export const INVALID_POSITION: [number, number] = [-1, -1];

export type IState = {
	modules: {
		[key: string]: IModule;
	};
	mouseDragStartPosition: [number, number];
	mouseDragPosition: [number, number];
};

export const initialState: IState = {
	modules: {
		abc: {
			moduleKey: 'abc',
			type: 'DELAY',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200,
			selectionState: ModuleSelectionState.UNSELECTED
		},
		def: {
			moduleKey: 'def',
			type: 'FILTER',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200,
			selectionState: ModuleSelectionState.UNSELECTED
		},
		'123': {
			moduleKey: '123',
			type: 'OSCILLATOR',
			x: Math.round(Math.random() * 800),
			y: Math.round(Math.random() * 800),
			width: 200,
			height: 200,
			selectionState: ModuleSelectionState.UNSELECTED
		}
	},
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION
};
