import { INVALID_POSITION, IPatchState } from './types/patch';
import { randomId } from '../../utils/random-id';
import { Modifier } from '../../constants/key';
import { randomName } from '../../utils/random-name';

export const blankPatch = (): IPatchState => ({
	id: randomId(),
	heldModifiers: Modifier.NONE,
	isKeyMovementEnabled: true,
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
	mouseDragStartPosition: INVALID_POSITION,
	mouseDragPosition: INVALID_POSITION,
	name: randomName(),
	selectedModuleKeys: new Set(),
	selectionPending: false,
	parameters: {},
	io: {},
	loadingFromCloud: false,
});
