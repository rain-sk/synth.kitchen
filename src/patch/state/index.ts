import { INVALID_POSITION, IPatchState } from './types/patch';
import { randomId } from '../../utils/random-id';
import { Modifier } from '../../constants/key';
import { randomName } from '../../utils/random-name';
import { ISerializedPatch } from './types/serialized-patch';
import { IModule } from './types/module';

export const blankPatchToLoad = (): ISerializedPatch => ({
	id: '',
	name: '',
	modules: {},
	modulePositions: {},
	connections: {},
});

export const blankModules = (): Record<string, IModule> => ({
	'0': {
		name: 'output',
		moduleKey: '0',
		type: 'OUTPUT',
		state: { gain: 0.45 },
	},
});

export const blankPatch = (): IPatchState => ({
	// patch info
	id: randomId(),
	name: randomName(),

	// modules and parameters
	modules: {
		...blankModules(),
	},
	modulePositions: {
		'0': [50, 50],
	},
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
	selectionPending: false,

	// keyboard info
	heldModifiers: Modifier.NONE,
	isKeyMovementEnabled: true,

	// misc
	loadingFromCloud: false,
});
