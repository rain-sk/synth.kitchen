import React, { useEffect, useState } from 'react';
import { actions } from '../state/actions';
import { IModuleState, ModuleType } from '../state/types/module';
import { useDispatchContext } from './use-dispatch-context';

export const useModuleState = <T extends ModuleType>(
	init: IModuleState[T] | (() => IModuleState[T]),
	moduleKey: string
): [IModuleState[T], React.Dispatch<React.SetStateAction<IModuleState[T]>>] => {
	const [state, setState] = useState(init);

	const dispatch = useDispatchContext();

	useEffect(() => {
		if (state) {
			dispatch(actions.updateModuleAction(moduleKey, { state }));
		}
	}, [state, moduleKey]);

	return [state, setState];
};
