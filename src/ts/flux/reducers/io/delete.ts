import { State } from '../../state';

export const IoDelete = (state: State, payload: { id: string }): State => {
	const { moduleMap, modules } = state;

	moduleMap.delete(payload.id);

	for (let i = 0; i < modules.length; i++) {
		for (let j = 0; j < modules[i].length; j++) {
			if (modules[i][j] === payload.id) {
				modules[i].splice(j, 1);
			}
		}
	}

	return {
		...state,
		moduleMap,
		modules
	}
};