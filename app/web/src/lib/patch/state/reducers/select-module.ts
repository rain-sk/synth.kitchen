import { ISelectModule, SelectModuleType } from '../actions/select-module';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const selectModule: React.Reducer<IPatchState, ISelectModule> = (
	state,
	action,
) => {
	const { moduleKey, type } = action.payload;
	const { selectedModuleKeys } = state;

	const moduleIsSelected = moduleKey && selectedModuleKeys.has(moduleKey);

	switch (type) {
		case SelectModuleType.DESELECT_ALL: {
			return cloneAndApply(state, {
				selectedModuleKeys: new Set(),
			});
		}
		case SelectModuleType.DESELECT: {
			return moduleIsSelected
				? cloneAndApply(state, {
						selectedModuleKeys: new Set(
							[...selectedModuleKeys].filter((key) => key != moduleKey),
						),
				  })
				: state;
		}
		case SelectModuleType.SELECT: {
			return moduleIsSelected
				? state
				: cloneAndApply(state, {
						selectedModuleKeys: new Set([...selectedModuleKeys, moduleKey]),
				  });
		}
		case SelectModuleType.SELECT_SINGLE: {
			return moduleIsSelected
				? state
				: cloneAndApply(state, {
						selectedModuleKeys: new Set([moduleKey]),
				  });
		}
	}
};
