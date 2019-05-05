import { State } from '../../state';
import { ioConnect, ioDeactivate } from '../../actions';

export const MouseClick = (state: State, payload: { id: string }): State => {
	console.log('click');
	if (!state.activeSecondary) {
		if (state.activePrimary) {
			return {
				...state,
				activeSecondary: payload.id,
				dispatchQueue: [ioConnect()]
			};
		} else {
			return {
				...state,
				activePrimary: payload.id
			};
		}
	}
	return {
		...state,
		activeSecondary: payload.id,
		dispatchQueue: [ioDeactivate()]
	};
}