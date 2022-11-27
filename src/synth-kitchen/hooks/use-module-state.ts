import React, { useEffect, useState } from 'react';
import { useDispatchContext } from '../contexts/dispatch';
import { actions } from '../state/actions';
import { IModuleState, ModuleType } from '../state/types/module';

export const useModuleState = <T extends ModuleType>(
	initialState: IModuleState[T],
	moduleKey: string
): [IModuleState[T], React.Dispatch<React.SetStateAction<IModuleState[T]>>] => {
	const [state, setState] = useState(initialState);

	const dispatch = useDispatchContext();

	useEffect(() => {
		if (state) {
			dispatch(actions.updateModuleStateAction(moduleKey, state));
		}
	}, [state, moduleKey]);

	return [state, setState];
};
