import { ModuleState } from '../state';

export const ModuleRename = (state: ModuleState, [guid, newName]: [string, string]): ModuleState => {
	const { moduleMap } = state;
	const module = moduleMap.get(guid);
	if (module) {
		module.name = newName;
		moduleMap.set(guid, module);
	}
	return ({
		...state,
		moduleMap
	});
}