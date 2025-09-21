import { ISelectModule } from '../actions/select-module';
import { SelectModuleType } from '../actions/select-module';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const selectModule: React.Reducer<IPatchState, ISelectModule> = (
	state,
	action,
) => {
	const { id, type } = action.payload;
	const { selectedModuleKeys } = state;

	const moduleIsSelected = id && selectedModuleKeys.has(id);

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
							[...selectedModuleKeys].filter((key) => key != id),
						),
				  })
				: state;
		}
		case SelectModuleType.SELECT: {
			return moduleIsSelected
				? state
				: cloneAndApply(state, {
						selectedModuleKeys: new Set([...selectedModuleKeys, id]),
				  });
		}
		case SelectModuleType.SELECT_SINGLE: {
			return moduleIsSelected
				? state
				: cloneAndApply(state, {
						selectedModuleKeys: new Set([id]),
				  });
		}
	}
};
