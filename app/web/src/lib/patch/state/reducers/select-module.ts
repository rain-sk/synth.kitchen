import { ISelectModule } from '../actions/select-module';
import { SelectModuleType } from '../actions/select-module';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const selectModule: React.Reducer<IPatchState, ISelectModule> = (
	state,
	action,
) => {
	const { id, type } = action.payload;
	const { selectedModules } = state;

	const moduleIsSelected = id && selectedModules.has(id);

	switch (type) {
		case SelectModuleType.DESELECT_ALL: {
			return cloneAndApply(state, {
				selectedModules: new Set(),
			});
		}
		case SelectModuleType.DESELECT: {
			return moduleIsSelected
				? cloneAndApply(state, {
						selectedModules: new Set(
							Array.from(selectedModules).filter((key) => key != id),
						),
				  })
				: state;
		}
		case SelectModuleType.SELECT: {
			return moduleIsSelected
				? state
				: cloneAndApply(state, {
						selectedModules: new Set([...selectedModules, id]),
				  });
		}
		case SelectModuleType.SELECT_SINGLE: {
			return moduleIsSelected
				? state
				: cloneAndApply(state, {
						selectedModules: new Set([id]),
				  });
		}
	}
};
