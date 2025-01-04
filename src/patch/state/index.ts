import { INVALID_POSITION, IPatchState } from './types/patch';
import { randomId } from '../../utils/random-id';
import { Modifier } from '../../constants/key';
import { randomName } from '../../utils/random-name';

export const blankPatch = (): IPatchState => ({
	// patch info
	id: randomId(),
	name: randomName(),

	// modules and parameters
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
	connectionsToLoad: undefined,
});
