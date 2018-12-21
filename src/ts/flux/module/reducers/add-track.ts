import { ModuleState } from '../state';

export const AddTrack = (state: ModuleState): ModuleState => {
	const { modules } = state;
	const newTrack: string[] = [];

	modules.push(newTrack);

	return {
		...state,
		modules
	};
}