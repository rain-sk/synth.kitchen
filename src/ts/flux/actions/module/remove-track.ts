import { ModuleAction } from '.';

export function moduleRemoveTrack(track: number): { type: ModuleAction & 'MODULE_REMOVE_TRACK', payload: { track: number } } {
	return {
		type: 'MODULE_REMOVE_TRACK',
		payload: {
			track
		}
	};
}