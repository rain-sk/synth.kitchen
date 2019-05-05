import { ModuleAction } from '.';

export function moduleRemove(track: number, row: number): { type: ModuleAction & 'MODULE_REMOVE', payload: { track: number, row: number } } {
	return {
		type: 'MODULE_REMOVE',
		payload: {
			track,
			row
		}
	};
}