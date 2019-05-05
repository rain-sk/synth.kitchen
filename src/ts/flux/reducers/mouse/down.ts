import { State } from '../../state';
import { ioDeactivate } from '../../actions';

export const MouseDown = (state: State, payload: { id: string }): State => {
	console.log('down');
	if (!state.activePrimary && !state.activeSecondary) {
		return {
			...state,
			activePrimary: payload.id
		};
	}
	return {
		...state,
		dispatchQueue: [ioDeactivate()]
	};
}