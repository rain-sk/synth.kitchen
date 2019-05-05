import { IoAction } from '.';

/**
 * delete an IO Node (active or supplied)
 * @param id optional - the id of the IO Node to be deleted
 */
export function ioDelete(id?: string): { type: IoAction & 'IO_DELETE', payload?: { id: string } } {
	if (id !== undefined) {
		return {
			type: 'IO_DELETE',
			payload: {
				id
			}
		};
	}
	return {
		type: 'IO_DELETE'
	};
}
