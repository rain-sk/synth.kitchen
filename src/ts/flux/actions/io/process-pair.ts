import { IoAction } from '.';

export function ioProcessPair(): { type: IoAction & 'IO_PROCESS_PAIR' } {
	return {
		type: 'IO_PROCESS_PAIR'
	};
}