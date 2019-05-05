import { ModuleAction } from '../../actions/module';

export function moduleAddTrack(): { type: ModuleAction & 'MODULE_ADD_TRACK' } {
	return {
		type: 'MODULE_ADD_TRACK'
	};
}
