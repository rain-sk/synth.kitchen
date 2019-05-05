import { IoAction } from '.';

export function ioRegister(id: string, node: any): { type: IoAction & 'IO_REGISTER', payload: { id: string, node: any } } {
	return {
		type: 'IO_REGISTER',
		payload: {
			id,
			node
		}
	};
}