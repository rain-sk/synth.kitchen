import { ModuleType } from '../../state/module-factories';
import { ModuleAction } from '../../actions/module';

export function moduleAdd(track: number, type: ModuleType): { type: ModuleAction & 'MODULE_ADD', payload: { track: number, type: ModuleType } } {
	return {
		type: 'MODULE_ADD',
		payload: {
			track,
			type
		}
	};
}
