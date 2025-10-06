import { Module, ModulePosition, ModuleType } from 'synth.kitchen-shared';

import { IPatchState } from './types/patch';
import { Modifier } from '../constants/key';
import { ISerializedPatch } from './types/serialized-patch';
import { INVALID_POSITION } from './constants/positions';
import { convertRemToPixels } from '../../shared/utils/rem-to-px';
import { History } from './types/history';

export const blankPatchToClearCanvas = (): ISerializedPatch => ({
	id: '',
	name: '',
	slug: '',
	modules: {},
	modulePositions: {},
	connections: {},
});

export const outputModule: () => Module = () => ({
	name: 'output',
	id: '0',
	type: ModuleType.OUTPUT,
	state: { version: '0.5.0', gain: 0.45 },
});

const outputModulePosition = (): ModulePosition => {
	const main = document.getElementById('main');
	if (!main) {
		return [-20000, -20000];
	}

	const { width, height } = main.getBoundingClientRect();
	const rightOffset = convertRemToPixels(9);
	const bottomOffset = convertRemToPixels(14);
	return [width - rightOffset, height - bottomOffset];
};

export const blankPatchToLoad = (): ISerializedPatch => ({
	id: '', // no id
	name: '', // 'Untitled'
	slug: '', // no slug
	modules: {
		['0']: outputModule(),
	},
	modulePositions: {
		['0']: outputModulePosition(),
	},
	connections: {},
});

export const blankPatch = (): IPatchState => ({
	// patch info
	id: '', // no id
	name: '', // 'Untitled'
	slug: '', // no slug
	creator: { id: '', username: '' },

	// modules and parameters
	modules: {},
	modulePositions: {},
	selectedConnections: new Set(),
	selectedModules: new Set(),

	// i/o
	activeConnectorKey: undefined,
	connectors: {},
	connections: {},
	connectionsToLoad: {},
	io: {},
	parameters: {},

	// mouse info
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	pendingConnectionSelection: undefined,
	pendingModuleSelection: undefined,

	// keyboard info
	heldModifiers: Modifier.NONE,
	focusedInput: undefined,

	history: new History(),
	historyPointer: -1,
	blockHistory: true,
	asyncActionQueue: [],
});

export { patchReducer } from './reducers';
