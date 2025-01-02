import React, { useContext, useEffect, useState } from 'react';
import { patchActions } from '../patch/state/actions';
import { IModule, IModuleState, ModuleType } from '../patch/state/types/module';
import { useEffectOnce } from './use-effect-once';
import { PatchContext } from '../patch/contexts/patch';

const disconnectRef = <NodeType>(
	ref: React.MutableRefObject<NodeType | undefined>,
) => {
	if (ref.current && typeof ref.current === 'object') {
		if ('stop' in ref.current && typeof ref.current.stop === 'function') {
			ref.current.stop();
		} else if (
			'disconnect' in ref.current &&
			typeof ref.current.disconnect === 'function'
		) {
			ref.current.disconnect();
		}
	}
	ref.current = undefined;
};

export const useModuleState = <T extends ModuleType, NodeType>(
	ref: React.MutableRefObject<NodeType>,
	module: IModule,
	init: () => IModuleState[T],
): [IModuleState[T], React.Dispatch<React.SetStateAction<IModuleState[T]>>] => {
	const [state, setState] = useState(init);

	useEffectOnce(() => () => {
		disconnectRef(ref);
	});

	const { dispatch } = useContext(PatchContext);

	useEffect(() => {
		if (state) {
			dispatch(patchActions.updateModuleAction(module.moduleKey, { state }));
		}
	}, [dispatch, module.moduleKey, state]);

	return [state, setState];
};
