import { IoAction } from '.';

/**
 * 
 * @param id1 optional - the id of one IO Node to be connected
 * @param id2 optional - the id of another IO Node to be connected
 */
export function ioConnect(id1?: string, id2?: string): { type: IoAction & 'IO_CONNECT', payload?: { id1: string, id2: string } } {
	if (id1 !== undefined && id2 !== undefined) {
		return {
			type: 'IO_CONNECT',
			payload: {
				id1,
				id2
			}
		};
	} else {
		return {
			type: 'IO_CONNECT'
		};
	}
}