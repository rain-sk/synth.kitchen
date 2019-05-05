import { IoAction } from '.';

/**
 * 
 * @param id optional - the id of the IO Node to be activated
 */
export function ioActivate(id?: string): { type: IoAction & 'IO_ACTIVATE', payload?: { id: string } } {
	if (id !== undefined) {
		return {
			type: 'IO_ACTIVATE',
			payload: {
				id
			}
		};
	} else {
		return {
			type: 'IO_ACTIVATE'
		};
	}
}