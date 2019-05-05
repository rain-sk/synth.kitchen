import { IoAction } from '.';

/**
 * 
 * @param id optional - the id of the IO Node to be cleared
 */
export function ioClear(id?: string): { type: IoAction & 'IO_CLEAR', payload?: { id: string } } {
	if (id !== undefined) {
		return {
			type: 'IO_CLEAR',
			payload: {
				id
			}
		};
	} else {
		return {
			type: 'IO_CLEAR'
		};
	}
}
