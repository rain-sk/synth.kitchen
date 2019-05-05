import { IoAction } from '.';

/**
 * 
 * @param id1 optional - the id of one IO Node to be disconnected
 * @param id2 optional - the id of another IO Node to be disconnected
 */
export function ioDisconnect(id1?: string, id2?: string): { type: IoAction & 'IO_DISCONNECT', payload?: { id1?: string, id2?: string } } {
	if (id1 !== undefined && id2 !== undefined) {
		return {
			type: 'IO_DISCONNECT',
			payload: {
				id1,
				id2
			}
		};
	}
	return {
		type: 'IO_DISCONNECT'
	};
}
