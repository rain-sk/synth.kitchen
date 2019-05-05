import { State } from '../../state';

export const AddTrack = (state: State): State => {
	const { modules } = state;
	const newTrack: string[] = [];

	modules.push(newTrack);

	return {
		...state,
		modules
	};
}