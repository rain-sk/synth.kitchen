import { ISelectModule, SelectModuleType } from '../actions/select-module';
import { IState } from '../types/state';

export const selectModule: React.Reducer<IState, ISelectModule> = (
	state,
	action,
) => {
	const { moduleKey, type } = action.payload;
	const { selectedModuleKeys } = state;

	const moduleIsSelected = moduleKey && selectedModuleKeys.has(moduleKey);

	switch (type) {
		case SelectModuleType.DESELECT_ALL: {
			return {
				...state,
				selectedModuleKeys: new Set(),
			};
		}
		case SelectModuleType.DESELECT: {
			return moduleIsSelected
				? {
						...state,
						selectedModuleKeys: new Set(
							[...selectedModuleKeys].filter((key) => key != moduleKey),
						),
				  }
				: state;
		}
		case SelectModuleType.SELECT: {
			return moduleIsSelected
				? state
				: {
						...state,
						selectedModuleKeys: new Set([...selectedModuleKeys, moduleKey]),
				  };
		}
		case SelectModuleType.SELECT_SINGLE: {
			return moduleIsSelected
				? state
				: {
						...state,
						selectedModuleKeys: new Set([moduleKey]),
				  };
		}
	}
};
