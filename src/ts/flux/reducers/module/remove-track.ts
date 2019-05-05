import { State } from '../../state';

export const RemoveTrack = (state: State, payload: { track: number }): State => {

	if (payload) {
		const { modules } = state;
		modules.splice(payload.track, 1);

		return {
			...state,
			modules
		};
	}

	return state;
}