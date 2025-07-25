import { INVALID_POSITION, IPatchState } from './types/patch';
import { Modifier } from '../constants/key';
import { ISerializedPatch } from './types/serialized-patch';
import { IModule } from './types/module';
import { randomId } from '../../../utils/randomId';
import { randomName } from '../../../utils/randomName';

export const blankPatchToClearCanvas = (): ISerializedPatch => ({
	id: '',
	name: '',
	modules: {},
	modulePositions: {},
	connections: {},
});

export const outputModule: () => IModule = () => ({
	name: 'output',
	moduleKey: '0',
	type: 'OUTPUT',
	state: { gain: 0.45 },
});

export const blankPatchToLoad = (id?: string): ISerializedPatch => ({
	id: id ? id : randomId(),
	name: randomName(),
	modules: {
		['0']: outputModule(),
	},
	modulePositions: {
		['0']: [50, 50],
	},
	connections: {},
});

export const blankPatch = (): IPatchState => ({
	// patch info
	id: '',
	name: '',
	chef: { id: '', username: '' },

	// modules and parameters
	modules: {},
	modulePositions: {},
	selectedModuleKeys: new Set(),

	// i/o
	activeConnectorKey: undefined,
	connectors: {},
	connections: {},
	io: {},
	parameters: {},

	// mouse info
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	pendingSelection: undefined,

	// keyboard info
	heldModifiers: Modifier.NONE,
	focusedInput: undefined,
});
