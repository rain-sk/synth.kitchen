import { IoAction } from '.';

/**
 * clear active IO Nodes
 */
export function ioDeactivate(): { type: IoAction & 'IO_DEACTIVATE' } {
	return {
		type: 'IO_DEACTIVATE'
	};
}
